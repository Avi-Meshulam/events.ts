import { Publisher } from './publisher';
import { Subscriber } from './subscriber';

const subscriber1 = new Subscriber('Subscriber 1');
const subscriber2 = new Subscriber('Subscriber 2');

Publisher.instance.someProperty = '123';
Publisher.instance.someProperty = '456';
