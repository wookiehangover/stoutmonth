jQuery(function( $ ){

var rating = $('#stout-rating');

rating.on( 'change', 'input', function( e ){

  var $this = $(e.target);

  if( window.confirm('Are you sure you wanna rate this?') ){

    $.post( rating.attr('action'), { rating: $this.val() } )
    .done(function( data ){

      rating.find('input').not( $this ).attr('disabled', true );

      $('.rating').html('<span>'+ data.rating +'</span> '+ data.starRating );

    })
    .fail(function( jqXHR, textStatus ){

      alert('Looks like you\'ve rated this one already');

    });
  }

});

});
