{
    // class declaration
    class Rectangle {
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }
    }
}

/*

let c = new Circle(); // ReferenceError
class Circle {} // class declarations are not hoisted

 */

{
    // unnamed class expression (also NOT hoisted)
    let Circle = class {
        constructor(radius) {
            this.radius = radius;
        }
    };

// named class expression
    let Square = class Square {
        constructor(side) {
            this.side = side;
        }
    };
}

{
    class Rectangle {
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }
        // Getter
        get area() {
            return this.calcArea();
        }
        set id(id) {
            this._id = 'Rectangle-' + id.toString();
        }
        get id() {
            return this._id;
        }
        // Method
        calcArea() {
            return this.height * this.width;
        }
    }

    const square = new Rectangle(10, 10);
    square.id = 42;
    console.log(square.id);

    console.log(square.area); // 100
}

{
    // static methods
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        static distance(a, b) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;

            return Math.hypot(dx, dy);
        }
    }

    const p1 = new Point(5, 5);
    const p2 = new Point(10, 10);

    console.log(Point.distance(p1, p2));
}

(() => {
    class Animal {
        speak() {
            return this;
        }
        static eat() {
            return this;
        }
    }

    // The behavior will be the same even if we write the code
    // in non-strict mode because all the functions, methods,
    // constructor, getters or setters are executed in strict mode.

    let obj = new Animal();
    console.log(obj.speak()); // Animal {}
    let speak = obj.speak;
    console.log(speak()); // undefined

    console.log(Animal.eat()); // class Animal
    let eat = Animal.eat;
    console.log(eat()); // undefined

    // new precedes dot
    // let animal = new (Animal.eat());
})();

(() => {
    function Animal() { }

    Animal.prototype.speak = function() {
        return this;
    };

    Animal.eat = function() {
        return this;
    };

    let obj = new Animal();
    let speak = obj.speak;
    console.log(speak().toString()); // global object

    let eat = Animal.eat;
    console.log(eat().toString()); // global object
})();

(() => {
    console.log('--- ES5 (manual) subclassing ---');

    // Hand-coded inheritance.
    function Animal(name) {
        this.name = name;
    }
    console.log('Animal.constructor === Function',
        Animal.constructor === Function);
    console.log('Animal.prototype.constructor === Animal',
        Animal.prototype.constructor === Animal);
    // func.prototype property specifies the __proto__ to be assigned
    // to all instances of objects created by the given function
    // when used as a constructor.
    Animal.prototype.speak = function () {
        console.log(this.name + ' makes a noise.');
    };
    Animal.prototype.sleep = function () {
        console.log('zzzz...');
    };
    Animal.prototype.poop = function () {
        console.log(this.name + ' 💩');
    };


    function Dog(name) {
        Animal.call(this, name);
    }
    console.log('Dog.constructor === Function',
        Dog.constructor === Function); // true
    console.log('Dog.prototype.constructor === Dog',
        Dog.prototype.constructor === Dog);
    // below assignment will override the 'constructor' property
    // so we need to restore it
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;

    /* Other ways of doing this:
        Dog.prototype.__proto__ = Animal.prototype;
        -----------------------------------------------
        function Placeholder() {}
        function derive(Child, Parent) {
            Placeholder.prototype = Parent.prototype;
            Child.prototype = new Placeholder();
        }
    */

    Dog.prototype.speak = function () {
        console.log(this.name + ' barks.');
    };
    Dog.prototype.poop = function () {
        console.log(this.__proto__ === Dog.prototype);              // true
        console.log(this.__proto__.poop === arguments.callee);      // true
        console.log(this.__proto__.__proto__ === Animal.prototype); // true

        // super method call
        // this.__proto__.__proto__.poop.call(this);
        Animal.prototype.poop.call(this);
        console.log('💩💩');
    };


    let animal = new Animal('Godzilla');
    console.log('animal.constructor === Animal:',
        animal.constructor === Animal);

    let dog = new Dog('Doge');
    console.log('dog.constructor === Dog:',
        dog.constructor === Dog);

    dog.speak();
    dog.sleep();
    dog.poop();

})();

(() => {
    console.log('--- ES6 subclassing ---');

    class Animal {
        constructor(name) {
            this.name = name;
        }
        speak() {
            console.log(this.name + ' makes a noise.');
        }
        sleep() {
            console.log(this.name + ' sleeps. Zzzz...');
        }
        poop() {
            console.log(this.name + ' 💩');
        }
    }

    class Dog extends Animal {
        // Below constructor is implicit.
        // constructor(name) {
        //     super(name);
        // }
        speak() {
            console.log(this.name + ' barks.');
        }
        poop() {
            super.poop();
            console.log('💩💩'); // double poop
        }
    }

    let dog = new Dog('Doge');
    dog.speak(); // Doge barks.
    dog.sleep(); // Doge sleeps. Zzzz...
    dog.poop();  // Doge 💩\n💩💩
    console.log(dog.id);

    console.log('dog.constructor === Dog:',
        dog.constructor === Dog);
})();

(() => {
    console.log('--- Transpiled ES6 -> ES5 subclassing ---')
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            // Note: not sure why Babel adds the constructor here.
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Animal = function () {
        function Animal(name) {
            _classCallCheck(this, Animal);

            this.name = name;
        }

        _createClass(Animal, [{
            key: 'speak',
            value: function speak() {
                console.log(this.name + ' makes a noise.');
            }
        }]);

        return Animal;
    }();

    var Dog = function (_Animal) {
        _inherits(Dog, _Animal);

        function Dog() {
            _classCallCheck(this, Dog);

            return _possibleConstructorReturn(this,
                (Dog.__proto__ || Object.getPrototypeOf(Dog)).apply(this, arguments));
        }

        _createClass(Dog, [{
            key: 'speak',
            value: function speak() {
                console.log(this.name + ' barks.');
            }
        }]);

        return Dog;
    }(Animal);

    var dog = new Dog('Doge');
    dog.speak(); // Doge barks.
    console.log(dog.hasOwnProperty('constructor')); // false
})();