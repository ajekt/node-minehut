# node-minehut
*node-minehut* is a NPM package designed to make using the [Minehut](https://minehut.com/) API easier.<br>
Heres an example:<br>
```javascript
Minehut.uploadWorld('path/to/world.zip');
```

## Installing & Using
Simply install the NPM package using:<br>
```
$ npm install node-minehut
```
Then to use node-minehut in your project:<br>
```javascript
let Minehut = require('node-minehut');

Minehut = new Minehut();
```
Check the documentation for all the functions.

## Contributing
If you are interested in contributing (e.g. Adding a new function, improving code etc.) There are a few simple rules:<br>
1. If you have made a new feature add documentation!
2. Any function that returns information to the user should start with get (e.g. *getTopServers()* returns the top servers but *deleteFile()* does not return anything).
3. *useSnakeCase*
