/*global window, module*/
/*jslint this:true*/
/*jshint -W079, -W038 */
/**
 * Created by tonte on 10/4/17.
 */

var window = window || {};
// var nodeModule = module || {};

(function (window) {
    'use strict';
    var BytePushers;

    if (window.BytePushers !== undefined && window.BytePushers !== null) {
        BytePushers = window.BytePushers;
    } else {
        window.BytePushers = {};
        BytePushers = window.BytePushers;
    }


    BytePushers.implementsInterface = function (o) { /*, ... */
        arguments.every(function (arg, argIndex) {
            if (argIndex > 0) {
                switch (typeof arg) { // If arg is a:
                case 'string': // string: check for a method with that name
                    if (typeof o[arg] !== "function") {
                        return false;
                    }
                    break;
                case 'function': // function: use the prototype object instead
                // If the argument is a function, we use its prototype object arg = arg.prototype;
                // fall through to the next case
                case 'object': // object: check for matching methods
                    Object.keys(arg).forEach(function (m) { //for (m in arg) { // For each property of the object
                        if (arg.hasOwnProperty(m)) {
                            if (typeof arg[m] !== "function") {
                                return false;  // Originally was a break but now it return false;
                            } // skip non-methods
                            if (typeof o[m] !== "function") {
                                return false;
                            }
                        }
                    });
                    break;
                }
            }
        });

        // If we're still here, then o implements everything
        return true;
    };

    BytePushers.namespace = function (ns_string) {
        var parts = ns_string.split('.'), parent = BytePushers;
        // strip redundant leading global
        if (parts[0] === "BytePushers") {
            parts = parts.slice(1);
        }
        parts.forEach(function (part) {
            // create a property if it doesn't exist
            if (parent[part] === undefined) {
                parent[part] = {};
            }
            parent = parent[part];
        });
        return parent;
    };

    /**
     * inherit() returns a newly created object that inherits properties from the prototype object p.
     * It uses the ECMAScript 5 function Object.create() if it is defined, and otherwise falls.
     *
     * @param p Represents the a prototype property of an object you want inherit.
     * @returns {*}
     */

    BytePushers.inherit = function (p) {
        var t;
        if (p === null) { // p must be non-null object
            throw new TypeError();
        }
        if (Object.create) {  // if Object.create() is defined...
            return Object.create(p);    // then just use it.
        }

        t = typeof p;  // Otherwise do some more type checking

        if (t !== "object" && t !== "function") {
            throw new TypeError();
        }

        function F() {// Define a dummy constructor function.
            return;
        }
        F.prototype = p;                // Set its prototype property to p.
        return new F();                 // Use f() to create an "heir" of p.
    };

    /**
     * defineClass() -- a utility function for defining JavaScript classes.
     *
     * This function expects a single object as its only argument.  It define
     * a new JavaScript class based on the data in that object and returns the
     * constructor function of the new class.  This function handles the repetitive
     * tasks of defining classes: setting up the prototype object for correct
     * inheritance, copying methods from other types, and so on.
     *
     * The object passed as an argument should have some or all of the
     * following properties:
     *
     *      name: the name of the class being defined.
     *            If specified, this value will be stored in the classname
     *            property of the prototype object.
     *
     *    extend: The constructor of the class to be extended.  If omitted,
     *            the Object() constructor will be used.  This value will
     *            be stored in the superclass property of the prototype object.
     *
     * construct: The constructor function for the class. If omitted, a new
     *            empty function will be used.  This value becomes the return
     *            value of the function, and is also stored in the constructor
     *            property of the prototype object.
     *
     *   methods: An object that specifies the instance methods (and other shared
     *            properties) for the class.  The properties of this object are
     *            copied into the prototype object of the class.  If omitted,
     *            an empty object is used instead.  Properties named
     *            "classname", "superclass", and "constructor" are reserved
     *            and should not be used in this object.
     *
     *   statics: An object that specifies the static methods (and other static
     *            properties) for the class.  The properties of this object become
     *            properties of the constructor function.  If omitted, an empty
     *            object is used instead.
     *
     *   borrows: A constructor function or array of constructor functions.
     *            The instance methods of each of the specified classes are copied
     *            into the prototype object of this new class so that the
     *            new class borrows the methods of each specified class.
     *            Constructors are processed in the order they are specified,
     *            so the methods of a class listed at the end of the array may
     *            overwrite the methods of those specified earlier. Note that
     *            borrowed methods are stored in the prototype object before
     *            the properties of the methods object above.  Therefore,
     *            methods specified in the methods object can overwrite borrowed
     *            methods. If this property is not specified, no methods are
     *            borrowed.
     *
     *  provides: A constructor function or array of constructor functions.
     *            After the prototype object is fully initialized, this function
     *            verifies that the prototype includes methods whose names and
     *            number of arguments match the instance methods defined by each
     *            of these classes.  No methods are copied; this is simply an
     *            assertion that this class "provides" the functionality of the
     *            specified classes.  If the assertion fails, this method will
     *            throw an exception.  If no exception is thrown, any
     *            instance of the new class can also be considered (using "duck
     *            typing") to be an instance of these other types.  If this
     *            property is not specified, no such verification is performed.
     **/
    BytePushers.defineClass = function (data) {
        // Extract the fields we'll use from the argument object.
        // Set up default values.
        var classname = data.name,
            Superclass = data.extend || Object,
            constructor = data.construct || function () {
                return;
            },
            methods = data.methods || {},
            statics = data.statics || {},
            borrows,
            provides,
            proto,
            /*i1,*/
            /*i2,*/
            c1,
            c2;
            /*,
            p1,*/
            /*p2,*/
            /*p3,*/
            /*p4,*/
            /*p5*/

        // Borrows may be a single constructor or an array of them.
        if (!data.borrows) {
            borrows = [];
        } else if (data.borrows instanceof Array) {
            borrows = data.borrows;
        } else {
            borrows = [data.borrows];
        }

        // Ditto for the provides property.
        if (!data.provides) {
            provides = [];
        } else if (data.provides instanceof Array) {
            provides = data.provides;
        } else {
            provides = [data.provides];
        }

        // Create the object that will become the prototype for our class.
        proto = new Superclass();

        // Delete any noninherited properties of this new prototype object.
        Object.keys(proto).forEach(function (p1) { //for (p1 in proto) {
            if (proto.hasOwnProperty(p1)) {
                delete proto[p1];
            }
        });

        // Borrow methods from "mixin" classes by copying to our prototype.
        // ignore parameter tells jsLint to ignore the first variable that is not being used in function.
        Object.keys(borrows).forEach(function (i1) { //for (i1 = 0; i1 < borrows.length; i1 = i1 + 1) {
            c1 = data.borrows[i1];
            borrows[i1] = c1;
            // Copy method properties from prototype of c to our prototype
            Object.keys(c1.prototype).forEach(function (p2) { //for (p2 in c1.prototype) {
                if (typeof c1.prototype[p2] === "function") {
                    proto[p2] = c1.prototype[p2];
                }
            });
        });

        // Copy instance methods to the prototype object
        // This may overwrite methods of the mixin classes
        Object.keys(methods).forEach(function (p3) { //for (p3 in methods) {
            if (methods.hasOwnProperty(p3)) {
                proto[p3] = methods[p3];
            }
        });

        // Set up the reserved "constructor", "superclass", and "classname"
        // properties of the prototype.
        proto.constructor = constructor;
        proto.Superclass = Superclass;
        // classname is set only if a name was actually specified.
        if (classname) {
            proto.classname = classname;
        }

        // Verify that our prototype provides all of the methods it is supposed to.
        Object.keys(provides).forEach(function (ignore, i2) { //for (i2 = 0; i2 < provides.length; i2 = i2 + 1) {  // for each class
            c2 = provides[i2];
            Object.keys(c2.prototype).forEach(function (p4) { //for (p4 in c2.prototype) {   // for each property
                if (typeof c2.prototype[p4] === "function" && (p4 === "constructor" || p4 === "superclass")) { //methods only
                    // Check that we have a method with the same name and that
                    // it has the same number of declared arguments.  If so, move on
                    if (proto.hasOwnProperty(p4) && typeof proto[p4] !== "function" && proto[p4].length !== c2.prototype[p4].length) {
                        // Otherwise, throw an exception
                        throw new Error("Class " + classname + " does not provide method " + c2.classname + "." + p4);
                    }
                }
            });
        });

        // Associate the prototype object with the constructor function
        constructor.prototype = proto;

        // Copy static properties to the constructor
        Object.keys(statics).forEach(function (p5) { //for (p5 in statics) {
            if (statics.hasOwnProperty(p5)) {
                constructor[p5] = statics[p5];
            }
        });

        // Finally, return the constructor function
        return constructor;
    };

    BytePushers.isArrayLike = function (x) {
        if (x instanceof Array) { // Real arrays are array-like
            return true;
        }
        if (!x.hasOwnProperty("length")) { // Arrays must have a length property
            return false;
        }
        if (typeof x.length !== "number") { // Length must be a number
            return false;
        }
        if (x.length < 0) { // and nonnegative
            return false;
        }
        if (x.length > 0) {
            // If the array is nonempty, it must at a minimum
            // have a property defined whose name is the number length-1
            if (!x.hasOwnProperty(x.length - 1)) {
                return false;
            }
        }
        return true;
    };

    // Return true if O has methods with the same name and arity as all
    // methods in I.prototype. Otherwise, return false.  Throws an exception
    // if I is a built-in type with nonenumerable methods.
    BytePushers.provides = function (O, I) {
        var proto = I.prototype; /*,p6*/
        // If O actually is an instance of I, it obviously looks like I
        if (O instanceof I) {
            return true;
        }

        // If a constructor was passed instead of an object, use its prototype
        if (typeof O === "function") {
            O = O.prototype;
        }

        // The methods of built-in types are not enumerable, and we return
        // undefined.  Otherwise any object would appear to provide any of
        // the built-in types.
        if (I === Array || I === Boolean || I === Date || I === Error || I === Function || I === Number || I === RegExp || I === String) {
            return undefined;
        }

        Object.keys(proto).forEach(function (p6) { //for (p6 in proto) {  // Loop through all properties in I.prototype
            // Ignore properties that are not functions
            if (typeof proto[p6] === "function") {
                // If O does not have a property by the same name return false
                if (!(O.hasOwnProperty(p6))) {
                    return false;
                }
                // If that property is not a function, return false
                if (typeof O[p6] !== "function") {
                    return false;
                }
                // If the two functions are not declared with the same number
                // of arguments return false.
                if (O[p6].length !== proto[p6].length) {
                    return false;
                }
            }
        });
        // If all the methods check out, we can finally return true.
        return true;
    };

    // This function creates a new enumerated type. The argument object specifies // the names and values of each instance of the class. The return value
    // is a constructor function that identifies the new class. Note, however
    // that the constructor throws an exception: you can't use it to create new
    // instances of the type. The returned constructor has properties that // map the name of a value to the value itself, and also a values array, // a foreach() iterator function
    BytePushers.enumeration = function (namesToValues) {
        // This is the dummy constructor function that will be the return value.
        var e, /*name, i3,*/
            enumeration = function () {
                throw "Can't Instantiate Enumerations";
            },
            proto;

        enumeration.prototype = { // Enumerated values inherit from this object.
            constructor: enumeration, // Identify type
            toString: function () {
                return this.name;
            }, // Return name
            valueOf: function () {
                return this.value;
            }, // Return value
            toJSON: function () {
                return this.name;
            } // For serialization
        };
        proto = enumeration;
        enumeration.values = []; // An array of the enumerated value objects

        // Now create the instances of this new type.
        Object.keys(namesToValues).forEach(function (name) { //for (name in namesToValues) {        // For each value
            if (namesToValues.hasOwnProperty(name)) {
                e = BytePushers.inherit(proto); // Create an object to represent it
                Object.defineProperties(e, {
                    "name": {
                        value: null,
                        writable: true
                    },
                    "value": {
                        value: null,
                        writable: true
                    },
                    "abbreviation": {
                        value: null,
                        writable: true
                    },
                    "description": {
                        value: null,
                        writable: true
                    }
                });
                e.name = name;                  // Give it a name
                e.value = namesToValues[name].value;  // And a value
                e.abbreviation = namesToValues[name].abbreviation;  // And a abbreviation
                e.description = namesToValues[name].description;  // And a description
                enumeration[name] = e;          // Make it a property of constructor
                enumeration.values.push(e);     // And store in the values array
            }
        });

        // A class method for iterating the instances of the class
        enumeration.foreach = function (f, c) {
            Object.keys(this.values).forEach(function (i3) { //for (i3 = 0; i3 < this.values.length; i3 = i3 + 1) {
                f.call(c, this.values[i3]);
            });
        };
        // Return the constructor that identifies the new type
        return enumeration;
    };

    nodeModule.exports = BytePushers;
}(window));
