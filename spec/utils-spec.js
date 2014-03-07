(function () {
    'use strict';

    describe('Utilities', function () {
        describe('Handy `parseInt` method', function () {
            it('should return parsed value', function () {
                expect(F.pInt('1024px', 1000)).toBe(1024);
            });

            it('should return parsed value', function () {
                expect(F.pInt('3.14159', 1000)).toBe(3);
            });

            it('should return default value', function () {
                expect(F.pInt({
                    number: 1024
                }, 1000)).toBe(1000);
            });

            it('should return `0`', function () {
                expect(F.pInt('one hundred')).toBe(0);
            });
        });

        describe('Handy `parseFloat` method', function () {
            it('should return parsed value', function () {
                expect(F.pFloat('1024px')).toBe(1024);
            });

            it('should return parsed value', function () {
                expect(F.pFloat('3.14159')).toBe(3.14159);
            });

            it('should return default value', function () {
                expect(F.pFloat('π', 3.14159)).toBe(3.14159);
            });

            it('should return `0`', function () {
                expect(F.pFloat('one hundred')).toBe(0);
            });
        });

        describe('Handy `toString` method', function () {
            it('should return default value', function () {
                expect(F.toStr(null, 'Default')).toBe('Default');
            });

            it('should return empty string', function () {
                expect(F.toStr()).toBe('');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(1024)).toBe('1024');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(function () {
                    return 'foo';
                })).toBe("function () { return 'foo'; }");
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(true)).toBe('true');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(['Jan', 'Feb', 'Mar', 'Apr'])).toBe('Jan,Feb,Mar,Apr');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(new RegExp('foo', 'g'))).toBe('/foo/g');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr(new Error('fatal error'))).toBe('Error: fatal error');
            });

            it('should return `toString()` result', function () {
                expect(F.toStr({})).toBe('[object Object]');
            });

            it('should return `toString()` result', function () {
                var Animal = function (name) {
                    this.name = name;
                };
                Animal.prototype.toString = function () {
                    return 'Animal named ' + this.name;
                };
                expect(F.toStr(new Animal('Tom'))).toBe('Animal named Tom');
            });

            it('should return `String`', function () {
                expect(F.toStr('Hello world')).toBe('Hello world');
            });
        });

        describe('Handy `toString` method', function () {
            it('should return default value', function () {
                expect(F.toString(null, 'Default')).toBe('Default');
            });

            it('should return empty string', function () {
                expect(F.toString()).toBe('');
            });

            it('should return `toString()` result', function () {
                expect(F.toString(1024)).toBe('1024');
            });

            it('should return `toString()` result', function () {
                expect(F.toString(function () {
                    return 'foo';
                })).toBe("function () { return 'foo'; }");
            });

            it('should return `toString()` result', function () {
                expect(F.toString(true)).toBe('true');
            });

            it('should return `toString()` result', function () {
                expect(F.toString(['Jan', 'Feb', 'Mar', 'Apr'])).toBe('Jan,Feb,Mar,Apr');
            });

            it('should return `toString()` result', function () {
                expect(F.toString(new RegExp('foo', 'g'))).toBe('/foo/g');
            });

            it('should return `toString()` result', function () {
                expect(F.toString(new Error('fatal error'))).toBe('Error: fatal error');
            });

            it('should return `toString()` result', function () {
                expect(F.toString({})).toBe('[object Object]');
            });

            it('should return `toString()` result', function () {
                var Animal = function (name) {
                    this.name = name;
                };
                Animal.prototype.toString = function () {
                    return 'Animal named ' + this.name;
                };
                expect(F.toString(new Animal('Tom'))).toBe('Animal named Tom');
            });

            it('should return `String`', function () {
                expect(F.toString('Hello world')).toBe('Hello world');
            });
        });

        describe('Handy `toArray` method', function () {
            it('should return passed `Array`', function () {
                expect(F.toArr(['Jan', 'Feb', 'Mar', 'Apr'])).toEqual(jasmine.any(Array));
                expect(F.toArr(['Jan', 'Feb', 'Mar', 'Apr'])).toEqual(['Jan', 'Feb', 'Mar', 'Apr']);
            });

            it('should return default value', function () {
                expect(F.toArr('Jan,Feb,Mar,Apr', [1, 2, 3, 4])).toEqual(jasmine.any(Array));
                expect(F.toArr('Jan,Feb,Mar,Apr', [1, 2, 3, 4])).toEqual([1, 2, 3, 4]);

            });

            it('should return an empty `Array`', function () {
                expect(F.toArr('Jan,Feb,Mar,Apr', '1,2,3,4')).toEqual(jasmine.any(Array));
                expect(F.toArr('Jan,Feb,Mar,Apr', '1,2,3,4')).toEqual([]);
            });
        });

        describe('Ensure that a value is a boolean', function () {
            it('should return `True`', function () {
                expect(F.toBool(true)).toBe(true);
            });

            it('should return `True`', function () {
                var bool = true;
                expect(F.toBool(bool)).toBe(true);
            });

            it('should return `False`', function () {
                expect(F.toBool(1)).toBe(false);
            });

            it('should return `False`', function () {
                expect(F.toBool('True')).toBe(false);
            });
        });

        describe('Check and returns a number within a range', function () {
            it('should return the passed `Number`', function () {
                expect(F.range(1024, 256, 2048)).toBe(1024);
            });

            it('should return the lower bound of the range', function () {
                expect(F.range(0, 256, 2048)).toBe(256);
            });

            it('should return the default parameter', function () {
                expect(F.range(0, 256, 2048, 1024)).toBe(1024);
            });

            it('should return the passed `Number` as the lower bound of the range', function () {
                expect(F.range(256, 256, 2048)).toBe(256);
            });

            it('should return the upper bound of the range', function () {
                expect(F.range(2048, 256, 1024)).toBe(1024);
            });

            it('should return the default parameter', function () {
                expect(F.range(2048, 256, 1024, 512)).toBe(512);
            });

            it('should return the default parameter', function () {
                expect(F.range('enough', 256, 1024, 512)).toBe(512);
            });

            it('should return zero', function () {
                expect(F.range('many', 256, 1024, 'too many')).toBe(0);
            });

            it('should return the passed `Number` as the upper bound of the range', function () {
                expect(F.range(1024, 256, 1024)).toBe(1024);
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.range(0, 'min', 256);
                }).toThrow();
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.range(0, 512, 'max');
                }).toThrow();
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.range(0, 512, 256);
                }).toThrow();
            });
        });

        describe('Get the length of an array in an infallible way', function () {
            it('should return 3', function () {
                expect(F.len(['Jan', 'Feb', 'Mar'])).toBe(3);
            });

            it('should return 3', function () {
                expect(F.len('ABC')).toBe(3);
            });

            it('should return 3', function () {
                expect(F.len({
                    length: 3
                })).toBe(3);
            });

            it('should return 0', function () {
                expect(F.len({
                    size: 3
                })).toBe(0);
            });

            it('should return 0', function () {
                expect(F.len(3)).toBe(0);
            });
        });

        describe('Get a regular `Array` from a javascript `arguments` object', function () {
            var testFunc = function () {
                return F.argToArr(arguments);
            };

            it('should return non-empty `Array`', function () {
                expect(testFunc(1, 2, 3)).toEqual(jasmine.any(Array));
                expect(testFunc(1, 2, 3)).toEqual([1, 2, 3]);
            });

            it('should return non-empty `Array`', function () {
                expect(testFunc(null)).toEqual(jasmine.any(Array));
                expect(testFunc(null)).toEqual([null]);
            });

            it('should return non-empty `Array`', function () {
                expect(testFunc(false)).toEqual(jasmine.any(Array));
                expect(testFunc(false)).toEqual([false]);
            });

            it('should return non-empty `Array`', function () {
                expect(testFunc(undefined)).toEqual(jasmine.any(Array));
                expect(testFunc(undefined)).toEqual([undefined]);
            });

            it('should return an empty `Array`', function () {
                expect(testFunc()).toEqual(jasmine.any(Array));
                expect(testFunc()).toEqual([]);
            });
        });

        describe('Test a condition', function () {
            it('should not throw an `Error`', function () {
                expect(function () {
                    F.assert(true);
                }).not.toThrow();
            });

            it('should not throw an `Error`', function () {
                expect(function () {
                    F.assert('hello');
                }).not.toThrow();
            });

            it('should not throw an `Error`', function () {
                expect(function () {
                    F.assert(1 + 1);
                }).not.toThrow();
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.assert(false);
                }).toThrow();
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.assert(null);
                }).toThrow();
            });

            it('should throw an `Error`', function () {
                expect(function () {
                    F.assert(1 - 1);
                }).toThrow();
            });
        });
    });
})();
