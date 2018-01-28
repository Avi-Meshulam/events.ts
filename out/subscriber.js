"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var publisher_1 = require("./publisher");
var Subscriber = /** @class */ (function () {
    function Subscriber(name) {
        this.name = name;
        this._subscriptions = [];
        this.subscribeToPublisherEvents();
    }
    Subscriber.prototype.subscribeToPublisherEvents = function () {
        var _this = this;
        var subscription = publisher_1.Publisher.instance.propertyChanged.subscribe(function (args) { return _this.publisher_propertyChanged(args); });
        this._subscriptions.push(subscription);
        // ...more events subscriptions
    };
    Subscriber.prototype.unsubscribeFromPublisherEvents = function () {
        this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
        this._subscriptions = [];
    };
    Subscriber.prototype.publisher_propertyChanged = function (e) {
        console.log(this.name + ": Publisher's " + e.propertyName + " property has changed" +
            ((e.oldValue ? " from: " + e.oldValue : '') + " to: " + publisher_1.Publisher.instance[e.propertyName]));
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map