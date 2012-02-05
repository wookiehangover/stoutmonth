var
  models   = require('../../lib/models'),
  fixtures = require('../fixtures'),
  assert   = require('assert');

/* ------------------------------ Drink ------------------------------ */

describe('Drink', function(){

  beforeEach(function( done ){
    this.drink = new models.drink( fixtures.factory.drink() );
    this.drink.save( done );
  });

  after(function( done ){
    models.drink.remove({ user: this.drink.user }, done);
  });

  it('should exist', function(){
    assert.ok( models.drink );
    assert.ok( this.drink );
  });

  describe('count', function(){

    it('should have a default value of 1', function(){
      assert.ok( this.drink.count, 0 );
    });

    it('should increment count when set', function( done ){
      this.drink.count = 1;

      this.drink.save(function( err, drink ){
        if( err ) throw err;

        assert.equal( drink.count, 1 );
        done();
      });
    });

  });

  describe('#getTotal', function(){

    it('should get the total number of drinks for a user', function( done ){
      var drink = new models.drink( fixtures.factory.drink({
        beer: 'some-other-sout',
        count: 1
      }) );

      drink.save(function( err, drink ){

        models.drink.getTotal( drink.user, function(err, total){
          assert.equal( total, 2 );
          done();
        });

      });
    });

  });

});


