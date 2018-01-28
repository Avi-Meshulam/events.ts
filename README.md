# events.ts
## Implementing events in Typescript with RxJS
### A publisher-subscriber example

#### The Publisher Class
```javascript
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { INotifyPropertyChanged } from './INotifyPropertyChanged';
import { PropertyChangedEventArgs } from './propertyChangedEventArgs';

export class Publisher implements INotifyPropertyChanged {
    
    // Singleton
    private static readonly _instance = new Publisher();

    // Using a Subject in order to allow for multiple subscribers
    // See: http://reactivex.io/rxjs/manual/overview.html#subject
    private readonly _propertyChanged = new Subject<PropertyChangedEventArgs>();

    private constructor() { }

    static get instance(): Publisher {
        return Publisher._instance;
    }

    // INotifyPropertyChanged implementation
    get propertyChanged(): Observable<PropertyChangedEventArgs> {
        return this._propertyChanged.asObservable();
    }

    //#region Properties
    private _someProperty = null;
    get someProperty(): any {
        return this._someProperty;
    }
    set someProperty(value: any) {
        if (this._someProperty !== value) {
            const oldValue = this._someProperty;
            this._someProperty = value;
            // Could be useful to have a name() function, like in C#, e.g. name(this.someProperty)
            this.onPropertyChanged('someProperty', oldValue);
        }
    }
    //#endregion Properties

    private onPropertyChanged(propertyName: string, oldValue?: any): void {
        // Trigger a call to next() on all subscribers
        this._propertyChanged.next(new PropertyChangedEventArgs(propertyName, oldValue));
    }
}
```

#### The Subscriber Class
```javascript
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PropertyChangedEventArgs } from './propertyChangedEventArgs';
import { Publisher } from './publisher';

const publisher = Publisher.instance;

export class Subscriber {

    // store all subscriptions in order to allow for unsubscribing when needed
    private _subscriptions: Subscription[] = [];
    
    constructor(public name: string) {
        this.subscribeToPublisherEvents();
    }

    private subscribeToPublisherEvents(): void {
        const subscription = publisher.propertyChanged.subscribe(
            args => this.publisher_propertyChanged(args)
        );
        this._subscriptions.push(subscription);

        // ...more events subscriptions
    }

    private unsubscribeFromPublisherEvents(): void {
        this._subscriptions.forEach(subscription => subscription.unsubscribe());
        this._subscriptions = [];
    }

    private publisher_propertyChanged(e: PropertyChangedEventArgs): void {
        console.log(`${this.name}: Publisher's ${e.propertyName} property has changed` +
            `${e.oldValue ? ` from: ${e.oldValue}` : ''} to: ${publisher[e.propertyName]}`);
    }
}
```

#### Interface & Base Classes
```javascript
import { Observable } from 'rxjs/Observable';

export class EventArgs {
    public static readonly Empty: EventArgs;
}

export class PropertyChangedEventArgs extends EventArgs {
    constructor(
        public readonly propertyName: string,
        public readonly oldValue?: any
    ) {
        super();
    }
}

export interface INotifyPropertyChanged {
    propertyChanged: Observable<PropertyChangedEventArgs>;
}
```

#### For a more concrete implementation, check out my [flight-control](https://github.com/PrisonerM13/flight-control) project:
+ [flight.ts](https://github.com/PrisonerM13/flight-control/blob/master/control-tower/src/app/models/flight.ts)
+ [leg.ts](https://github.com/PrisonerM13/flight-control/blob/master/control-tower/src/app/models/leg.ts)
+ [control-tower.component.ts](https://github.com/PrisonerM13/flight-control/blob/master/control-tower/src/app/components/control-tower/control-tower.component.ts#L771)
