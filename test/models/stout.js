var
  models   = require('../../lib/models'),
  fixtures = require('../fixtures'),
  assert   = require('assert');

/* ------------------------------ Stout ------------------------------ */

describe('Stout', function(){

  beforeEach(function( done ){
    this.stout = new models.stout( fixtures.stout );
    this.stout.save( done );
  });

  after(function( done ){
    models.stout.remove({ "slug" : "meat-packer-stout" }, done );
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
      assert.equal( this.stout.ratings, 1 );
    });

    it('should display the correct number of stars', function(){
      assert.equal( this.stout.starRating, '&#9733;&#9733;&#9733;&#9733;&#9734;' );
    });

  });

  describe('slug', function(){

    it('should prettify the stout slug', function(){
      assert.equal( this.stout.slug, 'meat-packer-stout' );
    });

  });

});


