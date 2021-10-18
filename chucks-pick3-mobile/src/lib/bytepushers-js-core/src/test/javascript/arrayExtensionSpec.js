describe("Array extension tests", function() {

    var isGreaterThanZero = function(elem, i, self) {
        return elem > 0;
    };

    describe('Tests for Array.every', function () {
        it('will return true if tests succeeds', function() {
            var result = [1, 2, 3, 4].every(isGreaterThanZero);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = [1, 2, 3, -1].every(isGreaterThanZero);

            expect(result).toBe(false);
        });
    });

    describe('Tests for Array.some', function () {
        it('will return true if tests succeeds', function() {
            var result = [-1, -2, -3, 4].some(isGreaterThanZero);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = [-1, -2, -3, -4].some(isGreaterThanZero);

            expect(result).toBe(false);
        });
    });

    describe('Tests for Array.forEach', function () {

        it('will loop through all elements of array', function () {

            var count = 0,
                countIterations = function () {
                    count++;

                    // See if it loops even if we return false.
                    return false;
                };

            [0, 1, 2, 3, 4].forEach(countIterations);

            expect(count).toBe(5);
        });
    });

    describe('Tests for Array.isArray', function () {
        it('Can tell an item is an array', function () {
            var result = Array.isArray([]) && // Try an empty array
                Array.isArray([1, 2, 3]) && // Try an array with basic types
                Array.isArray([{ a: "a" }, [1, 2, 3]]); // Try an array with more complex types

            expect(result).toBe(true);
        });

        it('Can tell if an item is not an array', function () {
            var result = Array.isArray(1) || // Try a Number
                Array.isArray("String") || // Try a String
                Array.isArray({ a: "" }); // Try an Object

            expect(result).toBe(false);
        });
    });
});