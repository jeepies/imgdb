import * as _ from '../src/index';
import Settings from '../src/i/Settings';

var settings : Settings = {
    path: "../imgdb"
}

var key = _.Generate("test", settings);

console.log(`Key is: ${key}`);
