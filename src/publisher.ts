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
