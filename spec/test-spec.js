(function () {
    'use strict';

    describe('Test functions', function () {
        describe('Check if value is a `Function`', function () {
            it('should return `True`', function () {
                expect(F.isFn(function () {})).toBe(true);
            });

            it('should return `True`', function () {
                /*jshint -W054*/
                expect(F.isFn(new Function())).toBe(true);
                /*jshint +W054*/
            });

            it('should return `True`', function () {
                expect(F.isFn([].push)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isFn({})).toBe(false);
            });
        });

        describe('Check if value is an `Array`', function () {
            it('should return `True`', function () {
                expect(F.isArr([1, 2, 3])).toBe(true);
            });

            it('should return `True`', function () {
                /*jshint -W009*/
                expect(F.isArr(new Array())).toBe(true);
                /*jshint +W009*/
            });

            it('should return `False`', function () {
                expect(F.isArr({
                    1: true,
                    2: true,
                    3: true
                })).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isArr(arguments)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isArr('string')).toBe(false);
            });
        });

        describe('Check if value is a `Boolean`', function () {
            it('should return `True`', function () {
                expect(F.isBool(false)).toBe(true);
            });

            it('should return `True`', function () {
                var bool = true;
                expect(F.isBool(bool)).toBe(true);
            });

            it('should return `False`', function () {
                var bool = 0;
                expect(F.isBool(bool)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isBool(1)).toBe(false);
            });
        });

        describe('Check if value is a `String`', function () {
            it('should return `True`', function () {
                expect(F.isStr('hello')).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isStr('')).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isStr(['hello'])).toBe(false);
            });
        });

        describe('Check if value is an `Object`', function () {
            it('should return `True`', function () {
                expect(F.isObj({})).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isObj(['hello'])).toBe(false);
            });
        });

        describe('Check if value is `undefined`', function () {
            it('should return `True`', function () {
                expect(F.isUdef()).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isUdef(undefined)).toBe(true);
            });

            it('should return `True`', function () {
                var u;
                expect(F.isUdef(u)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isUdef(null)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isUdef(false)).toBe(false);
            });
        });

        describe('Check if value is not `undefined`', function () {
            it('should return `True`', function () {
                expect(F.isDef(null)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isDef(false)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isDef(undefined)).toBe(false);
            });

            it('should return `False`', function () {
                var u;
                expect(F.isDef(u)).toBe(false);
            });
        });

        describe('Check if value is a number and is not `NaN`', function () {
            it('should return `True`', function () {
                expect(F.isNum(1)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNum(0)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNum(3.14159)).toBe(true);
            });

            it('should return `True`', function () {
                /*jshint -W053*/
                expect(F.isNum(new Number())).toBe(true);
                /*jshint +W053*/
            });

            it('should return `True`', function () {
                expect(F.isNum(Number.MAX_VALUE)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNum(Number.MIN_VALUE)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isNum(false)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNum(null)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNum(Number.NaN)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNum('1')).toBe(false);
            });
        });

        describe('Check if the supplied value is integer', function () {
            it('should return `True`', function () {
                expect(F.isInt(1)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isInt(0)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isInt(-1)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isInt(1.0)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isInt(3.14159)).toBe(false);
            });
        });

        describe('Check if the supplied value is float', function () {
            it('should return `True`', function () {
                expect(F.isFloat(3.14159)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isFloat(1.0)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isFloat(1)).toBe(false);
            });
        });

        describe('Check if the supplied value is an instance of given class', function () {
            it('should return `True`', function () {
                expect(F.isInst([], Array)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isInst([], Object)).toBe(true);
            });

            it('should return `True`', function () {
                var Animal = function (name) {
                    this.name = name;
                },
                    cat = new Animal('Tom');

                expect(F.isInst(cat, Animal)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isInst({}, Array)).toBe(false);
            });

            it('should return `False`', function () {
                var Animal = function (name) {
                    this.name = name;
                },
                    Cat = function (name) {
                        this.name = name;
                    },
                    tom = new Cat("Tom");

                expect(F.isInst(tom, Animal)).toBe(false);
            });
        });

        describe('Check if the supplied value is `null` or `undefined`', function () {
            it('should return `True`', function () {
                expect(F.isNone(null)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNone(undefined)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNone()).toBe(true);
            });

            it('should return `True`', function () {
                var none;
                expect(F.isNone(none)).toBe(true);
            });

            it('should return `False`', function () {
                var none = false;
                expect(F.isNone(none)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNone(0)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNone('')).toBe(false);
            });
        });

        describe('Check if the supplied value is not `null` or `undefined`', function () {
            it('should return `True`', function () {
                var none = false;
                expect(F.isNotNone(none)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNotNone(0)).toBe(true);
            });

            it('should return `True`', function () {
                expect(F.isNotNone('')).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.isNotNone(null)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNotNone(undefined)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.isNotNone()).toBe(false);
            });

            it('should return `False`', function () {
                var none;
                expect(F.isNotNone(none)).toBe(false);
            });
        });

        describe('Check if the supplied value is an object that implements an interface', function () {
            var obj = {
                method1: function () {
                    return 1;
                },
                method2: function () {
                    return 2;
                },
                method3: function () {
                    return 3;
                },
                property: 'Object property'
            };

            it('should return `True`', function () {
                var iface = [
                    'method1'
                ];
                expect(F.implement(obj, iface)).toBe(true);
            });

            it('should return `True`', function () {
                var iface = [
                    'method1',
                    'method2'
                ];
                expect(F.implement(obj, iface)).toBe(true);
            });

            it('should return `True`', function () {
                var iface = [
                    'method1',
                    'method2',
                    'method3'
                ];
                expect(F.implement(obj, iface)).toBe(true);
            });

            it('should return `False`', function () {
                var iface = [
                    'method1',
                    'method2',
                    'method3',
                    'method4'
                ];
                expect(F.implement(obj, iface)).toBe(false);
            });

            it('should return `False`', function () {
                var iface = [
                    'method1',
                    'method2',
                    'method3',
                    'property'
                ];
                expect(F.implement(obj, iface)).toBe(false);
            });

            it('should throw an error', function () {
                var iface = 'method1',
                    func = function () {
                        F.implement(obj, iface);
                    };
                expect(func).toThrow();
            });
        });
    });
})();
