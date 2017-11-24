# Piddly

The Tiny JavaScript Dependency Injection Container.

## Installation

```js
npm install --save piddly
```

## Usage

```js
var piddly = require('piddly');
```

Define all of your objects and their dependencies in a readable
manner using `piddly.create`...

```js
var nodes = piddly.create({
    
    'BookRepository': function(nodes) {
        return new BookRepository(nodes('Database'));
    },

    'BookOrderRepository': function(nodes) {
        return new BookOrderRepository(nodes('Database'));
    },

    'Database': function(nodes) {
        return new MongoDBDatabase(nodes('MongoDBConfig'))
    },

    'BookOrderController': function(nodes) {
        return new BookOrderController(
            nodes('BookOrderRepository'),
            nodes('BookOrderViewManager')
        );
    },

    // ...

    'Application': function(nodes) {
        return new Application(nodes('ControllerRegistry'));
    }

});
```

To examine the example a bit closer...

The keys used will be the keys you can use to access the object you
define using the `nodes` function.

The value must always be a function, this function should return your
constructed object and should be free from any side-effects (i.e. no
printing to the screen, sending orders for coffee or launching any
missiles), it's good practice.

In your definition, you can access any other object that has been
defined using the `nodes` function, this will always be provided as the
first argument to your definition function.

If your object doesn't have any dependencies it is recommended to omit
the `nodes` argument (it just makes it a bit more clear).

Then when you are ready to pull out the object you want, use the
`nodes` function returned from create...

```js
nodes('Application').run();
```

## Issues

If you find any issues, please log them [here][issues]

## Contributing

If you want to contribute, fork this repository and remember to create
pull requests for the neat stuff you want to contribute!

[issues]: https://github.com/superwatermelon/piddly/issues
