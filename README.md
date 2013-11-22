FightErr
========

JavaScript library to ease type checking and variables value validation for both browser and Node.

Installation and usage
----------------------

FightErr is available with [`bower`](http://bower.io/):

    bower install fighterr

or via [`npm`](https://npmjs.org/):

    npm install fighterr

### Disabling FightErr in production builds

Sometimes the idea of type checking on _production_ is considered useless, while it is very handy during development.
Here are a few tips on how to strip some (or even all) of the FightErr calls from the JavaScript files intended for
production use.

The trick is to use [UglifyJS](http://lisperator.net/uglifyjs/) for minifying JavaScript files with properly set
[Global definitions compressor options](http://lisperator.net/uglifyjs/compress#global-defs).

First of all, wrap all the FightErr calls you wish to strip later with `DEBUG` checks:

```javascript
var myFunction = function (strArg, numArg) {
  if (DEBUG) {
    F.str('strArg', strArg, 'myFunction');
    F.num('numArg', numArg, 'myFunction');
  }
  
  // rest of the code...
}
```

Then if you pass:
```javascript
global_defs: {
  DEBUG: false
}
```
the compressor will assume that's a constant defintion and will discard code like this as being unreachable.

Adapt the following configuration pieced to your building tools:

#### [Grunt](http://gruntjs.com/):

It is assumed that [`grunt-contrib-uglify`](https://github.com/gruntjs/grunt-contrib-uglify) plugin is installed
properly.

```javascript
// Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      compress: {
        global_defs: {
          "DEBUG": false
        },
        dead_code: true
      }
    },
    my_target: {
      files: {
        'dest/output.min.js': ['src/input.js']
      }
    }
  }
});
```

#### [Brunch](http://brunch.io/):

It is assumed that [`uglify-js-brunch`](https://github.com/brunch/uglify-js-brunch) plugin is installed properly.

```coffeescript
config =
  plugins:
    uglify:
      mangle: false
      compress:
        global_defs: 
          DEBUG: false
```

Documentation
-------------

Annotated source: http://nextusersf.github.io/fighterr/

License
-------

[MIT](https://raw.github.com/NextUserSF/fighterr/master/LICENSE)
