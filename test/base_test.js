var piddly = require('../lib/piddly');
var expect = require('expect');

describe('piddly', function() {

    it('Wires together objects', function() {

        // My Person class has a name which can be retrieved through
        // its getter.
        function Person(name) {
            this.getName = function() {
                return name;
            };
        }

        // My Greeter class expects a person with a name and will
        // produce a welcoming message when the method sayHello is
        // invoked.
        function Greeter(person) {
            this.sayHello = function() {
                return 'Hi, ' + person.getName();
            };
        }

        // My dependency graph sets up a person and a greeter and
        // defines just how they are wired together.
        var nodes = piddly.create({

            'Person': function() {
                return new Person('Stuart');
            },

            'Greeter': function(nodes) {
                return new Greeter(nodes('person'));
            }

        });

        // By pulling the Greeter out of the dependency graph the
        // person and any other dependencies that may be required in
        // future are created.
        expect(nodes('Greeter').sayHello()).toBe('Hi, Stuart');

    });

    it('Takes the stance that objects are shared', function() {

        // My Counter has some internal state that can be modified
        // making it easy to distinguish from another instance.
        function Counter() {
            var count = 0;

            this.increment = function() {
                count += 1;
                return this;
            };

            this.getCount = function() {
                return count;
            };
        }

        var nodes = piddly.create({

            'Counter': function() {
                return new Counter();
            }

        });

        nodes('Counter').increment();
        expect(nodes('Counter').getCount()).toBe(1);

    });

});
