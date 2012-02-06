var
  assert   = require('assert'),
  sinon    = require('sinon'),
  fixtures = require('../fixtures'),
  helper   = require('../helper'),
  request  = helper.request,
  response = helper.response,
  routes   = require('../../lib/routes'),
  models   = require('../../lib/models');


/* ------------------------------ User ------------------------------ */

// TODO
//describe('user.index')

describe('user.api.index', function(){

  it('should respond with the req.user helper', function( done ){
    var
      req = request({
        user: { login: 'old_dude' }
      }),
      res = response(function( body, code ){
        assert.equal( body.login, 'old_dude' );
        assert.equal( code, 200 );
        done();
      });


    routes.user.api.index( req, res );
  });

});

// TODO
// describe('user.api.update')

describe('user.api.destroy', function(){

  beforeEach(function( done ){
    var user = new models.user( fixtures.user );
    user.save( done );
  });

  afterEach(function( done ){
    models.user.remove({ login: 'old_dude'}, done);
  });

  it('should exist', function(){
    assert.ok( routes.user.api.destroy );
  });

  it('should respond with a 403 if invalid user', function( done ){
    var
      req = request({ user: false }),
      res = response(function( body, code ){
        assert.equal( body.error, "Forbidden" );
        assert.equal( code, 403 );
        done();
      });

    routes.user.api.destroy( req, res );
  });

  it('should call req#logout and redirect', function( done ){
    var
      req = request({ logout: function(){} }),
      spy = sinon.spy( req, 'logout' ),
      res = response(function( path ){
        assert.equal( path, '/' );
        assert.equal( spy.called, true );
        done();
      });

    routes.user.api.destroy( req, res );
  });

  it('should destroy the user', function( done ){
    var
      req = request({ logout: function(){} }),
      res = response(function(){
        models.user.find({ login: 'old_dude' }, function( err, doc ){
          assert.equal( doc.length, 0 );
          done();
        });
      });

    routes.user.api.destroy( req, res );
  });

});
