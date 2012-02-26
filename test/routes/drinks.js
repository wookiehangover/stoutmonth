var
  assert   = require('assert'),
  fixtures = require('../fixtures'),
  helper   = require('../helper'),
  request  = helper.request,
  response = helper.response,
  routes   = require('../../lib/routes'),
  models   = require('../../lib/models');


/* ------------------------------ Drinks ------------------------------ */

describe('drinks.api.index', function(){

  it('should exist', function(){
    assert.ok( routes.drinks.api.index );
  });

  it('should respond with a list of drinks', function( done ){

    var res = response(function( resp ){
      assert.equal( resp.length, 0 );
      done();
    });

    routes.drinks.api.index( request(), res );

  });

  it('should respond with a 403 without a user', function( done ){

    var res = response(function( resp, code ){
      assert.equal( resp.error, 'Forbidden' );
      assert.equal( code, 403 );
      done();
    });

    routes.drinks.api.index( { user: false }, res );

  });

});

describe('drinks.api.create', function(){

  after(function( done ){
    models.drink.remove({ user: 'old_dude'}, done);
  });

  it('should exist', function(){
    assert.ok( routes.drinks.api.create );
  });

  it('should create a drink', function( done ){
    var
      req = request({
        body: fixtures.factory.drink()
      }),
      res = response(function( resp ){
        assert.equal( resp.user, 'old_dude' );
        assert.equal( resp.count, 0 );
        done();
      });

    routes.drinks.api.create(req, res );
  });

});

describe('drinks.api.update', function(){

  after(function( done ){
    models.drink.remove({ user: 'old_dude'}, done);
  });

  it('should exist', function(){
    assert.ok( routes.drinks.api.update );
  });

  it('should update a drink', function( done ){

    this.drink = new models.drink( fixtures.factory.drink() );

    var
      req = request(),
      res = response(function( resp ){
        assert.equal( resp.count, 1 ); // count is incremented
        done();
      });

    this.drink.save(function( err, doc ){
      req.body = doc;
      routes.drinks.api.update( req, res );
    });

  });

});

describe('drinks.api.total', function(){

  after(function( done ){
    models.drink.remove({ user: 'old_dude'}, done);
  });

  it('should exist', function(){
    assert.ok( routes.drinks.api.total );
  });

  it('should show the total drink count', function( done ){

    this.drink = new models.drink( fixtures.factory.drink() );

    var
      req = request(),
      res = response(function( resp ){
        assert.equal( resp.total, 0 ); // count is incremented
        done();
      });

    this.drink.save(function( err, doc ){
      req.body = doc;
      routes.drinks.api.total( req, res );
    });

  });

});


describe('drinks.api.leaderboard', function(){

  it('should return stuff', function(done){
    var req = request(),

    res = response(function( body, code ){
      assert.ok( body );
      assert.equal( code, 200 );
      done();
    });

    routes.drinks.api.leaderboard( req, res );
  });

});

