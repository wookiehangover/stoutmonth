jQuery(function( $ ){

var rating = $('#stout-rating');

rating.on( 'change', 'input', function( e ){

  var
    $this = $(e.target),
    val   = $this.val(),
    msg   = rating.data('name') +'\n'+ val +'/5\t'+ $this.data('stars');

  if( window.confirm( msg ) ){

    $.post( rating.attr('action'), { rating: val } )
    .done(function( data ){

      rating.find('input').not( $this ).attr('disabled', true );

      $('.rating').html('<span>'+ data.rating +'</span> '+ data.starRating );

    })
    .fail(function( jqXHR, textStatus ){

      alert('Looks like you\'ve rated this one already');

    });
  }

});


$('#drink-it').on('click', function( e ){

  var
    $this = $(this),
    beer = $this.data('beer');

  if( confirm('Are you sure you drank that?') ){
    $.post('/api/drinks/', beer).done(function(){

      if( ! beer.count ){
        $('#stout-rating').slideDown();
      }
    });
  }

  return false;
});

});
