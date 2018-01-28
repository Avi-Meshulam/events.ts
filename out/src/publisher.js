"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
var propertyChangedEventArgs_1 = require("./propertyChangedEventArgs");
var Publisher = /** @class */ (function () {
    function Publisher() {
        this._propertyChanged = new Subject_1.Subject();
        //#region Properties
        this._someProperty = null;
    }
    Object.defineProperty(Publisher, "instance", {
        get: function () {
            return Publisher._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Publisher.prototype, "propertyChanged", {
        // INotifyPropertyChanged implementation
        get: function () {
            return this._propertyChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Publisher.prototype, "someProperty", {
        get: function () {
            return this._someProperty;
        },
        set: function (value) {
            if (this._someProperty !== value) {
                var oldValue = this._someProperty;
                this._someProperty = value;
                // Could be useful to have a name() function, like in C#, e.g. name(someProperty)
                this.onPropertyChanged('someProperty', oldValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    //#endregion Properties
    Publisher.prototype.onPropertyChanged = function (propertyName, oldValue) {
        this._propertyChanged.next(new propertyChangedEventArgs_1.PropertyChangedEventArgs(propertyName, oldValue));
    };
    // Singleton
    Publisher._instance = new Publisher();
    return Publisher;
}());
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.js.map