import { Observable } from 'rxjs/Observable';
import { PropertyChangedEventArgs } from './propertyChangedEventArgs';

export interface INotifyPropertyChanged {
    propertyChanged: Observable<PropertyChangedEventArgs>;
}
