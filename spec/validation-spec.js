(function () {
    'use strict';

    describe('Validation function', function () {
        describe('Validate a `Function` argument', function () {
            var testFunc = function (fnArg) {
                F.fn('fnArg', fnArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = function () {};
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                /*jshint -W054*/
                var arg = new Function();
                /*jshint +W054*/
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = [].push;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = {};
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate an `Array` argument', function () {
            var testFunc = function (arrArg) {
                F.arr('arrArg', arrArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = [1, 2, 3];
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                /*jslint -W009*/
                var arg = new Array();
                /*jslint +W009*/
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = {1: true, 2: true, 3: true};
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = arguments;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = 'string';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate a `String` argument', function () {
            var testFunc = function (strArg) {
                F.str('strArg', strArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = 'hello';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            /*it('should throw an `Error`', function () {
                var arg = '';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });*/

            it('should throw an `Error`', function () {
                var arg = ['hello'];
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate a `Number` argument', function () {
            var testFunc = function (numArg) {
                F.num('numArg', numArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = 1;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = 0;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = 3.14159;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                /*jshint -W053*/
                var arg = new Number();
                /*jshint +W053*/
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = Number.MAX_VALUE;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = Number.MIN_VALUE;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = null;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = Number.NaN;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = '1';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate a `Boolean` argument', function () {
            var testFunc = function (boolArg) {
                F.bool('boolArg', boolArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var bool = true;
                var arg = bool;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var bool = 0;
                var arg = bool;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = 1;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate an `Object` argument', function () {
            var testFunc = function (objArg) {
                F.obj('objArg', objArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = {};
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = ['hello'];
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate an `undefined` argument', function () {
            var testFunc = function (udefArg) {
                F.udef('udefArg', udefArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var func = function () {
                    testFunc();
                };

                expect(func).not.toThrow();
                expect(testFunc()).toBe(true);
            });

            it('should return `True`', function () {
                var func = function () {
                    testFunc(undefined);
                };

                expect(func).not.toThrow();
                expect(testFunc(undefined)).toBe(true);
            });

            it('should return `True`', function () {
                var arg;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = null;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate a not `undefined` argument', function () {
            var testFunc = function (defArg) {
                F.def('defArg', defArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = null;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var func = function () {
                    testFunc(undefined);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate an object that must be an instance of the given class', function () {
            var testFunc = function (instArg, constructor) {
                F.inst('instArg', instArg, constructor, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = [];
                var constructor = Array;
                var func = function () {
                    testFunc(arg, constructor);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg, constructor)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = [];
                var constructor = Object;
                var func = function () {
                    testFunc(arg, constructor);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg, constructor)).toBe(true);
            });

            it('should return `True`', function () {
                var Animal = function (name) {
                    this.name = name;
                };
                var cat = new Animal('Tom');
                var arg = cat;
                var constructor = Animal;
                var func = function () {
                    testFunc(arg, constructor);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg, constructor)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = {};
                var constructor = Array;
                var func = function () {
                    testFunc(arg, constructor);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var Animal = function (name) {
                    this.name = name;
                };
                var Cat = function (name) {
                    this.name = name;
                };
                var tom = new Cat('Tom');
                var arg = tom;
                var constructor = Animal;
                var func = function () {
                    testFunc(arg, constructor);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate that provided value is a truthy value', function () {
            var testFunc = function (truthyArg) {
                F.truthy('truthyArg', truthyArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = true;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = 1;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = 'True';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = 0;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = null;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });

        describe('Validate that provided value is a falsy value', function () {
            var testFunc = function (falsyArg) {
                F.falsy('falsyArg', falsyArg, 'testFunc');

                return true;
            };

            it('should return `True`', function () {
                var arg = false;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = 0;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg = null;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should return `True`', function () {
                var arg;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).not.toThrow();
                expect(testFunc(arg)).toBe(true);
            });

            it('should throw an `Error`', function () {
                var arg = true;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = 1;
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });

            it('should throw an `Error`', function () {
                var arg = 'True';
                var func = function () {
                    testFunc(arg);
                };

                expect(func).toThrow('Illegal argument error');
            });
        });
    });
})();
