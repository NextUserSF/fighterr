// FightErr offers a bunch of functions to help validate arguments of your functions.
//
// It contains three kind of functions:
// * [Validation functions](#validation): test type and throw an error if it's not the one required
// * [Test functions](#test): just test type of a variable value and return a boolean
// * [Utilities functions](#utils)
//
// You can use either `F` or `FightErr` keywords to access functions.
//
// Example:
//
//      var myFunction = function (strArg, numArg) {
//        // Check arguments
//        // Note that we give the function name so
//        // the error message is relevant
//        F.str('strArg', strArg, 'myFunction');
//        F.num('numArg', numArg, 'myFunction');
//
//        // Arguments are valid
//        console.log(strArg + " magic number is "
//          + F.toStr(numArg));
//      }
//
//      myFunction ( "Don't panic", 42 ) ;
//      // No error
//
//      myFunction ( "Don't panic", {} ) ;
//      // Error thrown: second argument is not a number
//
//      myFunction ( ["Don't panic"], 42 ) ;
//      // Error thrown: first argument is not a string

if ('undefined' === typeof F) {
    /*jshint -W020 */
    F = FightErr = function () {
        "use strict";

        F.log.apply(F, F.argToArr(arguments));
    };
    /*jshint +W020*/

    if ('undefined' !== typeof window) {
        window.F = window.FightErr = FightErr;
    }

    if ('undefined' !== typeof module && 'undefined' !== typeof module.exports) {
        module.exports = FightErr;
    }
}

(function (F) {

    "use strict";

    var fnType = typeof
        function () {},
        obj = {},
        chrome = typeof window !== 'undefined' && !! window.chrome,
        printStackTrace = (typeof window !== 'undefined' && !! window.printStackTrace) ? window.printStackTrace : false,
        has_console = !! console;

    // <a name="validation"></a>
    // Validation functions
    // ====================

    // fn
    // --

    // Validate a `Function` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.fn = function (n, v, func) {
        if (!F.isFn(v)) {
            throw F.e(n, func, 'function', typeof v, v);
        }
    };

    // arr
    // ---

    // Validate an `Array` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.arr = function (n, v, func) {
        if (!F.isArr(v)) {
            throw F.e(n, func, 'Array', typeof v, v);
        }
    };

    // str
    // ---

    // Validate a `String` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.str = function (n, v, func) {
        if (!F.isStr(v)) {
            throw F.e(n, func, 'string', typeof v, v);
        }
    };

    // num
    // ---

    // Validate a `Number` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.num = function (n, v, func) {
        if (!F.isNum(v)) {
            throw F.e(n, func, 'number', typeof v, v);
        }
    };

    // bool
    // ----

    // Validate a `Boolean` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.bool = function (n, v, func) {
        if (!F.isBool(v)) {
            throw F.e(n, func, 'boolean', typeof v, v);
        }
    };

    // obj
    // ---

    // Validate an `Object` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.obj = function (n, v, func) {
        if (!F.isObj(v)) {
            throw F.e(n, func, 'object', typeof v, v);
        }
    };

    // udef
    // ----

    // Validate an `undefined` argument

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.udef = function (n, v, func) {
        if (!F.isUdef(v)) {
            throw F.e(n, func, 'undefined', typeof v, v);
        }
    };

    // def
    // ---

    // Validate a not `undefined` argument (any value including `null`)

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.def = function (n, v, func) {
        if (!F.isDef(v)) {
            throw F.e(n, func, 'any defined value', typeof v, v);
        }
    };

    // inst
    // ----

    // Validate an object that must be an instance of the given class

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * c - `Function` Constructor to compare to
    // * func - `String` Name of the function where the argument type is checked

    F.inst = function (n, v, c, func) {
        if (!F.isInst(v, c)) {
            throw F.e(n, func, 'instance of ' + F.toStr(v), !! v && !! v.constructor ? v.constructor.name : F.toStr(v), v);
        }
    };

    // truthy
    // ------

    // Validate that provided value is a truthy value

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.truthy = function (n, v, func) {
        if (!v) {
            throw F.e(n, func, 'truthy', !F.toBool(v), v);
        }
    };

    // falsy
    // -----

    // Validate that provided value is a falsy value

    // Parameters:
    // * n - `String` Name of the argument as in the function declaration
    // * v - `mixed` Value to test
    // * func - `String` Name of the function where the argument type is checked

    F.falsy = function (n, v, func) {
        if ( !! v) {
            throw F.e(n, func, 'falsy', !! F.toBool(v), v);
        }
    };

    // <a name="test"></a>
    // Test functions
    // ==============

    // isFn
    // ----

    // Check if value is a `Function`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isFn = function (v) {
        return obj.toString.call(v) === '[object Function]';
    };

    // isArr
    // -----

    // Check if value is an `Array`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isArr = function (v) {
        return obj.toString.call(v) === '[object Array]';
    };

    // isBool
    // ------

    // Check if value is a `Boolean`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isBool = function (v) {
        return typeof v === 'boolean';
    };

    // isStr
    // -----

    // Check if value is a `String`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isStr = function (v) {
        return typeof v === 'string';
    };

    // isObj
    // -----

    // Check if value is an `Object`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isObj = function (v) {
        return typeof v === 'object' && !! v && v.constructor === obj.constructor;
    };

    // isUdef
    // ------

    // Check if value is `undefined`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isUdef = function (v) {
        return 'undefined' === typeof v;
    };

    // isDef
    // -----

    // Check if value is not `undefined`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isDef = function (v) {
        return 'undefined' !== typeof v;
    };

    // isNum
    // -----

    // Check if `v` is a number and is not `NaN`.

    // Taken from <https://raw.github.com/bestiejs/lodash/master/lodash.js>

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isNum = function (v) {
        return (typeof v === 'number' || obj.toString.call(v) === '[object Number]') && !isNaN(v);
    };

    // isInt
    // -----

    // Check if the supplied value is integer

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isInt = function (v) {
        return F.isNum(v) && (v % 1 === 0);
    };

    // isFloat
    // -------

    // Check if the supplied value is float.

    // 1.0 is consider a integer since stored as 1

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isFloat = function (v) {
        return (F.isNum(v) && (v % 1 !== 0));
    };

    // isInst
    // ------

    // Check if the supplied value is an instance of given class.

    // Parameters:
    // * v - `mixed` Value to test
    // * c - `Function` Class to compare to

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isInst = function (v, c) {
        try {
            return v instanceof c;
        } catch (e) {}
        return false;
    };

    // isNone
    // ------

    // Check if the supplied value is `null` or `undefined`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isNone = function (v) {
        return v === null || F.isUdef(v);
    };

    // isNotNone
    // ---------

    // Check if the supplied value is not `null` or `undefined`

    // Parameters:
    // * v - `mixed` Value to test

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.isNotNone = function (v) {
        return v !== null && F.isDef(v);
    };

    // implement
    // ---------

    // Check if the supplied value is an object that implements an interface

    // An interface here is a list of function names.

    // Parameters:
    // * obj - `mixed` Value to test
    // * interfazz - `Array` Interface to implement

    // Returns:
    // * `Boolean` True is test succeed, false otherwise

    F.implement = function (obj, interfazz) {
        var i,
            l;

        F.arr('interfazz', interfazz, 'F.implement');

        l = interfazz.length;

        if (F.isNone(obj)) {
            return false;
        }

        for (i = 0; i < l; i += 1) {
            if (!F.isFn(obj[interfazz[i]])) {
                return false;
            }
        }
        return true;
    };

    // <a name="utils"></a>
    // Utilities functions
    // ===================

    // pInt
    // ----

    // Handy `parseInt` method (on base 10). Returns a default if value is not parsable.

    // Parameters:
    // * v - `mixed` Number to parse
    // * def - `mixed` Default to return (Optional)

    // Returns:
    // * `Number` Parsed number if parsable, otherwise default value if provided, finally 0 if no default

    F.pInt = function (v, def) {
        v = parseInt(v, 10);
        return isNaN(v) ? def || 0 : v;
    };

    // pFloat
    // ------

    // Handy `parseFloat` method. Returns a default if value is not parsable.

    // Parameters:
    // * v - `mixed` Number to parse
    // * def - `mixed` Default to return (Optional)

    // Returns:
    // * `Number` Parsed number if parsable, otherwise default value if provided, finally 0 if no default

    F.pFloat = function (v, def) {
        v = parseFloat(v);
        return isNaN(v) ? def || 0 : v;
    };

    // toStr
    // -----

    // Handy `toString` method. Returns a default if value is not stringable (`null`, `undefined`).

    // Uses the object `toString` function if object provides one.

    // Parameters:
    // * v - `mixed` Value to get a string representation from
    // * def - `mixed` Default to return (Optional)

    // Returns:
    // * `String` String representation of value if available, otherwise default value if provided, finally an empty string if no default

    F.toStr = function (v, def) {
        if (v === null || F.isUdef(v)) {
            return def || '';
        }

        if (typeof v.toString === fnType) {
            return v.toString() || def || '';
        }

        v = String + v;
        return !v && def ? def : v;
    };

    // toString
    // --------

    // Alias of `FightErr.toStr()`
    F.toString = function (v, def) {
        return F.toStr(v, def);
    };

    // toArr
    // -----

    // Handy `toArray` method. Returns a default if value is not an array

    // Parameters:
    // * v - `mixed` Value to get a string representation from
    // * def - `Array` Default to return (Optional, default is an empty array)

    // Returns:
    // * `Array` Provided array it valid, default array or empty array otherwise

    F.toArr = function (v, def) {
        if (!F.isArr(v)) {
            return F.isArr(def) ? def : [];
        }

        return v;
    };

    // toBool
    // ------

    // Ensure that a value is a boolean

    // If value is strictly equal to `true`, returns `true`. Otherwise, return `false`.
    // That means that any value that is not a `true` boolean returns false.

    // Parameters:
    // * v - `mixed` Value to ensure `Boolean` type

    // Returns:
    // * `Boolean` Either true or false

    F.toBool = function (v) {
        return v === true ? v : false;
    };

    // range
    // -----

    // Check and returns a number within a range.

    // If number is not in the range and no default value is provided, the number is set to the min or max value depending it's closer to one or another.

    // Comparison between number and min/max values is inclusive. Any number equal to min or max values will be valid.

    // Parameters:
    // * v - `mixed` Number to check
    // * min - `Number` Lower bound of the range
    // * max - `Number` Upper bound of the range
    // * def - `Number` Default to return (Optional)

    // Returns:
    // * `Number` Resulting value

    F.range = function (v, min, max, def) {
        if (!F.isNum(v)) {
            return F.isNum(def) ? def : 0;
        }

        F.num('min', min, 'F.range');
        F.num('max', max, 'F.range');

        if (min > max) {
            throw new Error('F.range: Min value must be less than max value');
        }

        if (v < min) {
            if (F.isNum(def)) {
                return def;
            }
            v = min;
        } else if (v > max) {
            if (F.isNum(def)) {
                return def;
            }
            v = max;
        }

        return v;
    };

    // len
    // ---

    // Get the length of an array in an infallible way - that means that it returns 0 if given object is an array

    // Parameters:
    // * a - `mixed` Object that we suppose to be an array to get length from

    // Returns:
    // * `Number` Length of the array if parameter given is an array, 0 otherwsie

    F.len = function (a) {
        return F.isArr(a) || ( !! a && a.hasOwnProperty('length')) ? a.length : 0;
    };

    // argToArr
    // --------

    // Get a regular `Array` from a javascript `arguments` object.

    // Parameters:
    // * args_obj - `arguments` JS Function arguments object

    // Returns:
    // * `Array` Resulting array

    F.argToArr = function (args_obj) {
        return !!args_obj ? Array.prototype.slice.call(args_obj) : [];
    };

    // error
    // -----

    // Throw an error

    // Parameters:
    // * msg - `String` Error message

    F.error = function (msg) {
        if (DEBUG) {
            throw new Error('[ERROR] ' + msg);
        }

        // TODO: How to manage errors in production
    };

    // log
    // ---

    // Log a message in the console if `DEBUG` is set to true.

    // Parameters:
    // * msg - `mixed` Something to log

    F.log = function () {
        if (DEBUG && has_console) {
            var args = F.argToArr(arguments);
            if (chrome) {
                args.unshift('font-weight:bold;color: #55E;');
                args.unshift('%c[DEBUG]');
            } else {
                args.unshift('[DEBUG]');
            }
            console.log.apply(console, args);
        }
    };

    // notice
    // ------

    // Alias of `FightErr.log()`

    F.notice = function () {
        F.log.apply(F, F.argToArr(arguments));
    };

    // warn
    // ----

    // Log a warning message in the console if `DEBUG` is set to true.

    // Parameters:
    // * msg - `mixed` Something to log

    F.warn = function () {
        if (DEBUG && has_console) {
            var args = F.argToArr(arguments);
            if (chrome) {
                args.unshift('font-weight:bold;color: #f3a600;');
                args.unshift('%c[WARNING]');
            } else {
                args.unshift('[WARNING]');
            }
            args.push("\n" + F.stackTraceCleanup(printStackTrace({
                guess: false
            }))[0].split(' ')[0]);
            console.warn.apply(console, args);
        }
    };

    // deprecated
    // ----------

    // Log a warning message about deprecation of a method/class

    // Parameters:
    // * name - `String` Name of the deprecated class/function/property
    // * replacement - `String` Name of the replacement to use
    // (Optional, default is to add message stating that there is no replacement)
    // * note - `String` A message to append to deprecated message (Optional)

    F.deprecated = function (name, replacement, note) {
        if (DEBUG && has_console) {
            var args = F.argToArr(arguments),
                msg = '"' + name + '" is deprecated ' +
                    ( !! replacement ? 'in favor of "' + replacement + '"' :
                    ' without any replacement suggested') + '.\n' + (note ? 'Message: ' + note + '\n' : '');

            args.shift();
            args.shift();

            if (chrome) {
                args.unshift('font-weight:bold;color: #f3a600;');
                args.unshift('%c[DEPRECATED]');
            } else {
                args.unshift('[DEPRECATED]');
            }
            args.unshift(msg);
            args.push(F.stackTraceCleanup(printStackTrace({
                guess: false
            })).join('\n'));

            console.warn.apply(console, args);
        }
    };

    // assert
    // ------

    // Test a condition, and raise an error with given message if condition is not true

    // Parameters:
    // * condition - `mixed` Anything that is not 0, undefined, null, an empty string
    // * msg - `mixed` Message to show in error report
    // * doContinue - `Boolean` Avoid raising an error, just log a failure message and continue

    F.assert = function (condition, msg, doContinue) {
        if ( !! condition) {
            return;
        }
        if ( !! doContinue && DEBUG) {
            F.log('[FAILURE] ' + msg);
        } else {
            throw new Error('[FAILURE] ' + (msg || ''));
        }
    };

    // e
    // --

    // Get an illegal argument error

    // Parameters:
    // * name - `String` Name of the argument as in the function declaration
    // * func - `String` Name of the function where the argument type is checked
    // * required - `String` Type required
    // * given - `String` Type given
    // * value - `mixed` Given value

    F.e = function (name, func, required, given, value) {
        F.warn('Illegal argument type error: Argument ' + name + ' of function [' + func +
            '] should be [' + required + '] but is [' + given + ']. Argument value: ', value);
        if (printStackTrace && DEBUG) {
            F.warn(F.stackTraceCleanup(printStackTrace()));
        }
        return new TypeError('Illegal argument error');
    };

    if (DEBUG) {
        // stackTraceCleanup
        // -----------------

        // Cleanup stack trace from unwanted lines

        // __Available in DEBUG mode only__

        // Parameters:
        // * stacktrace - `Array` The StackTrace as returned by `printStackTrace`

        // Returns:
        // * `Array` A clean stack trace

        F.stackTraceCleanup = function (stacktrace) {
            while (
                stacktrace.length > 0 &&
                (stacktrace[0].indexOf('printStackTrace') > -1 ||
                    stacktrace[0].indexOf('F.deprecated') > -1 ||
                    stacktrace[0].indexOf('F.warn') > -1)
            ) {
                stacktrace.shift();
            }

            return stacktrace;
        };
    }

}(FightErr));
