var
  assert = require('assert'),
  stouts = require('../../app/stouts');

describe('stouts', function(){

  it('should exist', function(){
    console.log(stouts);
    assert.ok( stouts );
  });

});
