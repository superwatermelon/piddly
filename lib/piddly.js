exports.create = function(definitions) {

    // As objects are constructed they will be stored here.
    var cache = {};

    // The function that resolves the object graph from it's
    // definitions.
    var resolver = function(name) {
        if (cache[name] == null) {
            cache[name] = definitions[name](resolver);
        }
        return cache[name];
    };

    return resolver;
};
