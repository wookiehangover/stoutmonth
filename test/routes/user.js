var
  assert   = require('assert'),
  fixtures = require('../fixtures'),
  helper   = require('../helper'),
  request  = helper.request,
  response = helper.response,
  routes   = require('../../routes'),
  models   = require('../../lib/models');


/* ------------------------------ User ------------------------------ */

// TODO
//describe('user.index')

describe('user.api.index', function(){

  it('should respond with the req.user helper', function( done ){
    var
      req = request(),
      res = response(function( body, code ){
        assert.equal( body.login, 'old_dude' );
        assert.equal( code, 200 );
        done();
      });

    req.user = { login: 'old_dude' };

    routes.user.api.index( req, res );
  });

});
