
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"index": function(exports, require, module) {jQuery(function($) {

});
}, "modules/cornify": function(exports, require, module) {var cornify_count = 0,

cornify_add = function() {
  cornify_count += 1;
  var cornify_url = 'http://www.cornify.com/';
  var div = document.createElement('div');
  div.style.position = 'fixed';
  
  var numType = 'px';
  var heightRandom = Math.random()*.75;
  var windowHeight = 768;
  var windowWidth = 1024;
  var height = 0;
  var width = 0;
  var de = document.documentElement;
  if (typeof(window.innerHeight) == 'number') {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  } else if(de && de.clientHeight) {
    windowHeight = de.clientHeight;
    windowWidth = de.clientWidth;
  } else {
    numType = '%';
    height = Math.round( height*100 )+'%';
  }
  
  div.onclick = cornify_add;
  div.style.zIndex = 10;
  div.style.outline = 0;
  
  if( cornify_count==15 ) {
    div.style.top = Math.max( 0, Math.round( (windowHeight-530)/2 ) )  + 'px';
    div.style.left = Math.round( (windowWidth-530)/2 ) + 'px';
    div.style.zIndex = 1000;
  } else {
    if( numType=='px' ) div.style.top = Math.round( windowHeight*heightRandom ) + numType;
    else div.style.top = height;
    div.style.left = Math.round( Math.random()*90 ) + '%';
  }
  
  var img = document.createElement('img');
  var currentTime = new Date();
  var submitTime = currentTime.getTime();
  if( cornify_count==15 ) submitTime = 0;
  img.setAttribute('src',cornify_url+'getacorn.php?r=' + submitTime + '&url='+document.location.href);
  var ease = "all .1s linear";
  //div.style['-webkit-transition'] = ease;
  //div.style.webkitTransition = ease;
  div.style.WebkitTransition = ease;
  div.style.WebkitTransform = "rotate(1deg) scale(1.01,1.01)";
  //div.style.MozTransition = "all .1s linear";
  div.style.transition = "all .1s linear";
  div.onmouseover = function() {
    var size = 1+Math.round(Math.random()*10)/100;
    var angle = Math.round(Math.random()*20-10);
    var result = "rotate("+angle+"deg) scale("+size+","+size+")";
    this.style.transform = result;
    //this.style['-webkit-transform'] = result;
    //this.style.webkitTransform = result;
    this.style.WebkitTransform = result;
    //this.style.MozTransform = result;
    //alert(this + ' | ' + result);
  }
  div.onmouseout = function() {
    var size = .9+Math.round(Math.random()*10)/100;
    var angle = Math.round(Math.random()*6-3);
    var result = "rotate("+angle+"deg) scale("+size+","+size+")";
    this.style.transform = result;  
    //this.style['-webkit-transform'] = result;
    //this.style.webkitTransform = result;
    this.style.WebkitTransform = result;
    //this.style.MozTransform = result;
  }
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(div);
  div.appendChild(img); 
  
  // Add stylesheet.
  if (cornify_count == 5) {
    var cssExisting = document.getElementById('__cornify_css');
    if (!cssExisting) {
      var head = document.getElementsByTagName("head")[0];
      var css = document.createElement('link');
      css.id = '__cornify_css';
      css.type = 'text/css';
      css.rel = 'stylesheet';
      css.href = 'http://www.cornify.com/css/cornify.css';
      css.media = 'screen';
      head.appendChild(css);
    }
    cornify_replace();
  } 
};

var cornify_replace = function() {
  // Replace text.
  var hc = 6;
  var hs;
  var h;
  var k;
  var words = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'];
  while(hc >= 1) {
    hs = document.getElementsByTagName('h' + hc);
    for (k = 0; k < hs.length; k++) {
      h = hs[k];
      h.innerHTML = words[Math.floor(Math.random()*words.length)] + ' ' + h.innerHTML;
    }
    hc-=1;
  }
};

/*
 * Adapted from http://www.snaptortoise.com/konami-js/
 */
this.cornami = {
  input:"",
  pattern:"38384040373937396665",
  clear:setTimeout('cornami.clear_input()',5000),
  load: function() {
    window.document.onkeydown = function(e) {
      if (cornami.input == cornami.pattern) {
        cornify_add();
        clearTimeout(cornami.clear);
        return;
      }
      else {
        cornami.input += e ? e.keyCode : event.keyCode;
        if (cornami.input == cornami.pattern) cornify_add();
        clearTimeout(cornami.clear);
        cornami.clear = setTimeout("cornami.clear_input()", 5000);
      }
    }
  },
  clear_input: function() {
    cornami.input="";
    clearTimeout(cornami.clear);
  }
};

this.cornami.load();

module.exports = cornify_add;
}, "modules/localstorage": function(exports, require, module) {/**
 * Backbone localStorage Adapter v1.0
 * https://github.com/jeromegn/Backbone.localStorage
 */

// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
window.Store = function(name) {
  this.name = name;
  var store = localStorage.getItem(this.name);
  this.records = (store && store.split(",")) || [];
};

_.extend(Store.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    localStorage.setItem(this.name, this.records.join(","));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) model.id = model.attributes.id = guid();
    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return model;
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
    localStorage.setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(this.records, model.id.toString())) this.records.push(model.id.toString()); this.save();
    return model;
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return JSON.parse(localStorage.getItem(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _.map(this.records, function(id){return JSON.parse(localStorage.getItem(this.name+"-"+id));}, this);
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    localStorage.removeItem(this.name+"-"+model.id);
    this.records = _.reject(this.records, function(record_id){return record_id == model.id.toString();});
    this.save();
    return model;
  }

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
Backbone.localSync = function(method, model, options, error) {

  // Backwards compatibility with Backbone <= 0.3.3
  if (typeof options == 'function') {
    options = {
      success: options,
      error: error
    };
  }

  var resp;
  var store = model.localStorage || model.collection.localStorage;

  switch (method) {
    case "read":    resp = model.id != undefined ? store.find(model) : store.findAll(); break;
    case "create":  resp = store.create(model);                            break;
    case "update":  resp = store.update(model);                            break;
    case "delete":  resp = store.destroy(model);                           break;
  }

  if (resp) {
    options.success(resp);
  } else {
    options.error("Record not found");
  }
};

// Override 'Backbone.sync' to default to localSync, 
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.ajaxSync = Backbone.sync;
Backbone.sync = Backbone.localSync;
}, "modules/namespace": function(exports, require, module) {this.Stout = this.Stout || {
  module: function() {
    // Internal module cache.
    var modules = {};

    // Create a new module reference scaffold or load an existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return ( modules[name] = { Views: {} } );
    };
  }(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({}, Backbone.Events)
};

Backbone.Model.prototype.idAttribute = "_id";

// use localstorage for anonymous users
if( ( this.Stout.local = ! this.ea_loggedIn ) ){
  require('modules/localstorage');
} else {
  // make a dummy storage method
  this.Store = function(){ return {}; };
}

module.exports = this.Stout;
}, "modules/touch": function(exports, require, module) {(function($) {

  var m, parentIfText, swipeDirection, touch, types, _fn, _i, _len;

  $.support.touch = 'ontouchstart' in window;

  touch = {};

  parentIfText = function(node) {
    if ('tagName' in node) {
      return node;
    } else {
      return node.parentNode;
    }
  };

  swipeDirection = function(x1, x2, y1, y2) {
    var xDelta, yDelta;
    xDelta = Math.abs(x1 - x2);
    yDelta = Math.abs(y1 - y2);
    if (xDelta >= yDelta) {
      if (x1 - x2 > 0) {
        return 'Left';
      } else {
        return 'Right';
      }
    } else {
      if (y1 - y2 > 0) {
        return 'Up';
      } else {
        return 'Down';
      }
    }
  };

  $(function() {

    return $('body').bind('touchstart', function(e) {
      var delta, now;
      e = e.originalEvent;
      now = Date.now();
      delta = now - (touch.last || now);
      touch.target = parentIfText(e.touches[0].target);
      touch.x1 = e.touches[0].pageX;
      touch.y1 = e.touches[0].pageY;
      return (touch.last = now);
    }).bind('touchmove', function(e) {
      e = e.originalEvent;
      touch.x2 = e.touches[0].pageX;
      return (touch.y2 = e.touches[0].pageY);
    }).bind('touchend', function(e) {
      e = e.originalEvent;
      if (touch.x2 > 0 || touch.y2 > 0) {
        if( Math.abs(touch.x1 - touch.x2) > 30 || Math.abs(touch.y1 - touch.y2) > 30 && $(touch.target).trigger('swipe') ) {
          $(touch.target).trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
        }

        return (touch.x1 = touch.x2 = touch.y1 = touch.y2 = touch.last = 0);
      } else if ('last' in touch) {
        $(touch.target).trigger('tap');
        return (touch = {});
      }
    }).bind('touchcancel', function(e) {
      return (touch = {});
    });

  });

  if ($.support.touch) {

    $('body').bind('click', function(e) {
      return e.preventDefault();
    });

  } else {

    $(function() {
      return $('body').bind('click', function(e) {
        return $(e.target).trigger('tap');
      });
    });
  }

  types = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap'];
  _fn = function(m) {
    return ($.fn[m] = function(callback) {
      return this.bind(m, callback);
    });
  };

  for (_i = 0, _len = types.length; _i < _len; _i++) {
    m = types[_i];
    _fn(m);
  }

})( jQuery );

}, "stout_detail": function(exports, require, module) {jQuery(function( $ ){

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


$('#drink-it').on('click', function( e ){

  var $this = $(this);

  if( confirm('Are you sure you drank that?') ){
    $.post('/api/drinks/', $this.data('beer')).done(function(){
      $('#stout-rating').slideDown();
    });
  }

  return false;
});

});
}, "stouts": function(exports, require, module) {var
  nm      = require('modules/namespace'),
  cornify = require('modules/cornify'); // shh!

var User = Backbone.Model.extend({

  initialize: function(){
    this.deferred = this.fetch();
  },

  localStorage: new Store('user'),

  url: '/api/user'
});

var DrinkView = Backbone.View.extend({

  initialize: function(){

    this.setCount( this.model.get('count') );

    this.model.bind('change', function( model ){
      this.setCount( model.get('count') );
    }, this);

  },

  setCount: function( count ){
    var $this = this.$el.find('.counter');
    $this.text( count );
    this.$el.attr('class', 'd_'+ ( count > 9 ? 10 : count ) );
  }

});

var Drink = Backbone.Model.extend({

  initialize: function(){
    this.view = new DrinkView({ model: this, el: $('#'+ this.get('beer') ) });
  }

});

var Drinks = Backbone.Collection.extend({
  url: '/api/drinks',

  localStorage: new Store('drinks'),

  model: Drink,

  initialize: function(){
    this.fetch();
  },

  findByBeer: function( beer ){
    return this.find(function( model ){
      return beer === model.get('beer');
    });
  },

  drink: function( slug, user ){

    var beer = this.findByBeer( slug );

    if( ! confirm('Are you sure you drank that?') ){
      return;
    }


    if( beer ){

      if( beer.get('count') >= 13 ) cornify();

      return beer.save({
        count: beer.get('count') + 1
      });

    } else {

      beer = new Drink({
        beer: slug,
        user: user,
        count: 1
      });

      this.add(beer);

      return beer.save();
    }

  }

});


var StoutList = Backbone.View.extend({

  initialize: function( data ){
    if( data.user ){
      this.user = data.user;
    }

    if( data.drinks ){
      this.drinks = data.drinks;
    }

  },

  events: {
    "click .button": "onDrink"
  },

  onDrink: function( e ){
    e.preventDefault();

    var $this = $(e.currentTarget);

    this.drinks.drink( $this.data('slug'), this.user.get('login') );
  }

});


jQuery(function( $ ){

  nm.drinks = new Drinks();
  nm.user   = new User();

  nm.stoutList = new StoutList({
    el: $('#stout-list'),
    user: nm.user,
    drinks: nm.drinks
  });

});
}});
