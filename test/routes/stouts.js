var
  assert   = require('assert'),
  fixtures = require('../fixtures'),
  helper   = require('../helper'),
  request  = helper.request,
  response = helper.response,
  routes   = require('../../lib/routes'),
  models   = require('../../lib/models');


/* ------------------------------ Stouts ------------------------------ */

describe('stouts.index', function(){

  it('should exist', function(){
    assert.ok( routes.stouts.index );
  });

  it('should call #render with the proper template', function( done ){
    var res = response(function( path, context ){
      assert.equal( path, 'stout/index' );
      assert.equal( context.js_module, 'stouts');
      assert.ok( context.stouts );
      done();
    });

    routes.stouts.index( request(), res );
  });

});

describe('stouts.show', function(){

  before(function( done ){
    this.stout = new models.stout( fixtures.stout );
    this.stout.save( done );
  });

  after(function( done ){
    models.stout.remove({ name : 'Meat Packer Stout' }, done );
  });

  it('should exist', function(){
    assert.ok( routes.stouts.show );
  });

  it('should return a single record', function( done ){

    var
      req = request({
        params: { slug: 'meat-packer-stout' }
      }),
      res = response(function( path, context ){

        assert.equal( path, 'stout/show' );
        assert.equal( context.stout.name, 'Meat Packer Stout' );
        assert.equal( context.js_module, 'stout_detail' );

        done();
      });

    routes.stouts.show( req, res );
  });

  // TODO
  //it('should return a drink object when available', function(){
    //assert.ok(false);
  //});

});

describe('stouts.new', function(){

  it('should render the new template', function( done ){
    var res = response(function( path ){
      assert.equal( path, 'stout/new' );
      done();
    });

    routes.stouts['new']( request(), res );
  });

});

describe('stouts.create', function(){

  it('should create a new stout', function( done ){
    var
      req = request({
        body: { stout: fixtures.stout }
      }),
      res = response(function( redirect_path ){
        assert.equal( redirect_path, '/stout/meat-packer-stout' );
        models.stout.remove({ name : 'Meat Packer Stout' }, done );
      });

    routes.stouts.create( req, res );
  });

});

describe('stouts.edit', function(){

  before(function( done ){
    this.stout = new models.stout( fixtures.stout );
    this.stout.save( done );
  });

  after(function( done ){
    models.stout.remove({ name: 'Meat Packer Stout' }, done );
  });

  it('should render the edit view', function( done ){
    var
      req = request({
        params: { slug: 'meat-packer-stout' }
      }),
      res = response(function( path, context ){
        assert.equal( path, 'stout/edit' );
        assert.equal( context.stout.name, 'Meat Packer Stout' );
        done();
      });

    routes.stouts.edit( req, res );
  });

});

describe('stouts.udpate ', function(){

  before(function( done ){
    this.stout = new models.stout( fixtures.stout );
    this.stout.save( done );
  });

  after(function( done ){
    models.stout.remove({ name: 'Feet Packer Stout' }, done );
  });

  it('should render the edit view', function( done ){
    var
      req = request({
        params: { slug: 'meat-packer-stout' }
      }),
      res = response(function( path, context ){
        assert.equal( path, '/stout/feet-packer-stout' );
        done();
      });

    req.body.stout = fixtures.factory.stout({
      name: 'Feet Packer Stout',
      slug: 'feet-packer-stout'
    });

    routes.stouts.update( req, res );
  });

});

// TODO
//describe('stouts.destroy')

// TODO
//describe('stouts.api.index')

// TODO
//describe('stouts.api.show')

describe('stout.rate', function(){

  before(function( done ){
    var stout = new models.stout( fixtures.stout );

    stout.save( done );
  });

  after(function( done ){
    models.stout.remove({ name: 'Meat Packer Stout' }, function(){
      models.drink.remove({ beer: 'meat-packer-stout' }, done);
    });
  });

  it('should respond with a 403 if unauthenticated', function( done ){
    var
      req = request(),
      res = response(function( body, code ){
        assert.equal( body.error, 'Forbidden' );
        assert.equal( code, 403 );
        done();
      });

    req.user = false;

    routes.stouts.rate( req, res );
  });

  it('should respond with a 404 w/ an invalid stout', function( done ){

    var
      req = request({
        params: { slug: 'wuuuuuut' }
      }),
      res = response(function( body, code ){
        assert.equal( body.error, 'Stout not found' );
        assert.equal( code, 404 );
        done();
      });

    routes.stouts.rate( req, res );
  });

  it('should respond with a 404 w/ an invalid drink', function( done ){
    var
      req = request({
        params: { slug: 'meat-packer-stout' }
      }),
      res = response(function( body, code ){
        assert.equal( body.error, 'Drink not found' );
        assert.equal( code, 412 );
        done();
      });

    routes.stouts.rate( req, res );
  });

  it('should allow an authenticated user rate a stout', function( done ){
    var drink = new models.drink( {
      user: 'young_dude',
      beer: 'meat-packer-stout'
    });

    drink.save(function( err, doc ){
      if( err ) throw err;

      var
        req = request(),
        res = response(function( body, code ){

          assert.equal( code, 202 );
          done();
        });

      req.params.slug = doc.beer;
      req.user.get = function(){ return 'young_dude'; };

      routes.stouts.rate( req, res );

    });
  });

});


