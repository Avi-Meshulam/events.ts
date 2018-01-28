import { EventArgs } from './EventArgs';

export class PropertyChangedEventArgs extends EventArgs {
    constructor(
        public readonly propertyName: string,
        public readonly oldValue?: any
    ) {
        super();
    }
}
