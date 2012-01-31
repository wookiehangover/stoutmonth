jQuery(function( $ ){

var rating = $('#stout-rating');

rating.on( 'change', 'input', function( e ){

  var $this = $(e.target);

  $.post( rating.attr('action'), { rating: $this.val() } )
  .done(function( data ){

    rating.find('input').not( $this ).attr('disabled', true );

    console.log( data.rating );

  })
  .fail(function( jqXHR, textStatus ){

    alert(textStatus);

  });

});

});
