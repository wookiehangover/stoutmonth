var
  models   = require('../lib/models'),
  fixtures = require('./fixtures'),
  assert   = require('assert');

/* ------------------------------ Stout ------------------------------ */

describe('Stout', function(){

  beforeEach(function( done ){
    this.stout = new models.stout( fixtures.stout );
    this.stout.save( done );
  });

  after(function( done ){
    this.stout.remove( done );
  });

  it('should exist', function(){
    assert.ok( models.stout );
    assert.ok( this.stout );
  });

  it('should supply default text for (certain) empty fields', function(){
    assert.equal( this.stout.og, '??' );
  });

  describe('rating', function(){

    it('should calculate the average rating', function(){
      assert.equal( this.stout.rating, 4 ); // 4 / 1
    });

    it('should set raw_rating incrementally', function( done ){
      this.stout.raw_rating = 4;

      this.stout.save(function( err, stout ){
        assert.equal( stout.raw_rating, 8 );
        done();
      });
    });

    it('should increment ratings on save', function(){
      assert( this.stout.ratings, 2 );
    });

  });

  describe('slug', function(){

    it('should prettify the stout slug', function(){
      assert.equal( this.stout.slug, 'meat-packer-stout' );
    });

  });

});

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
      assert.ok( this.drink.count, 1 );
    });

    it('should increment count when set', function( done ){
      this.drink.count = 1;

      this.drink.save(function( err, drink ){
        if( err ) throw err;

        assert.equal( drink.count, 2 );
        done();
      });
    });

  });

  describe('#getTotal', function(){

    it('should get the total number of drinks for a user', function( done ){
      var drink = new models.drink( fixtures.factory.drink({
        beer: 'some-other-sout'
      }) );

      drink.save(function( err, drink ){

        models.drink.getTotal( drink.user, function(err, total){
          assert.equal( total, 6 );
          done();
        });

      });
    });

  });

});

/* ------------------------------ User ------------------------------ */

describe('User', function(){

  it('should exist', function(){
    assert.ok( models.user );
  });

});

