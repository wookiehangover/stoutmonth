var
  models   = require('../../lib/models'),
  fixtures = require('../fixtures'),
  assert   = require('assert');

/* ------------------------------ User ------------------------------ */

describe('User', function(){

  it('should exist', function(){
    assert.ok( models.user );
  });

});

