"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var publisher_1 = require("./publisher");
var subscriber_1 = require("./subscriber");
var subscriber1 = new subscriber_1.Subscriber('Subscriber 1');
var subscriber2 = new subscriber_1.Subscriber('Subscriber 2');
publisher_1.Publisher.instance.someProperty = '123';
publisher_1.Publisher.instance.someProperty = '456';
//# sourceMappingURL=main.js.map