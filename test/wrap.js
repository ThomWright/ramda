var R = require('..');
var eq = require('./shared/eq');


describe('wrap', function() {
  var greet = function(name) {return 'Hello ' + name;};

  it('allows you to modify the parameters', function() {
    var extendedGreet = R.wrap(greet, function(gr, name) {
      return gr(name.toUpperCase());
    });
    eq(greet('joe'), 'Hello joe');
    eq(extendedGreet('joe'), 'Hello JOE');
  });

  it('allows you to modify the output', function() {
    var extendedGreet = R.wrap(greet, function(gr, name) {
      return gr(name).toUpperCase();
    });
    eq(extendedGreet('joe'), 'HELLO JOE');
  });

  it('allows you to entirely replace the input function', function() {
    var extendedGreet = R.wrap(greet, function(gr, name) {
      return gr('my dear ' + name) + ', how are you?';
    });
    eq(extendedGreet('joe'), 'Hello my dear joe, how are you?');
  });

  it('maintains the arity of the function that is being wrapped', function() {
    var extendedGreet = R.wrap(greet, function(gr, name) {
      return gr('my dear ' + name) + ', how are you?';
    });
    eq(greet.length, extendedGreet.length);
  });

  it('returns a curried function', function() {
    var sideEffect;
    var add = function(a, b) {return a + b;};
    var wrappedAdd = R.wrap(add, function(plus, a, b) {
      sideEffect = plus(a, b);
      return sideEffect;
    });
    var add10 = wrappedAdd(10);
    eq(add10(5), 15);
    eq(sideEffect, 15);
  });

});
