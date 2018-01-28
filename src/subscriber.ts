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
