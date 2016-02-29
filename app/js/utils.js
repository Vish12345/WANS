Handlebars.registerHelper('isPro', function(sellerType) {
  if (sellerType == "PRO")
    return new Handlebars.SafeString("<abbr class=\"type\" title=\"pro\">(pro)</abbr>");
  return;
});

Handlebars.registerHelper('rate', function(value) {
  return  new Handlebars.SafeString(Math.round(value * 2));
});

Handlebars.registerHelper('priceTotal', function(value, shipping) {
  var total = value + shipping;
  return  new Handlebars.SafeString(total.toFixed(2));
});

Handlebars.registerHelper('numberFormat', function(value, dec) {
  return  new Handlebars.SafeString(value.toFixed(dec));
});

Handlebars.registerHelper('showPrice', function(query, advertType, options) {
  if (query == advertType || query == "ALL")
    return options.fn(this);
  return options.inverse(this);
});

Handlebars.registerHelper('compare', function(nb1, nb2, comparator, options) {
  switch (comparator) {
    case "==":
      if (nb1 == nb2)
        return options.fn(this);
      break;
    case "<=":
      if (nb1 <= nb2)
        return options.fn(this);
      break;
    case "<":
      if (nb1 < nb2)
        return options.fn(this);
      break;
    case ">=":
      if (nb1 >= nb2)
        return options.fn(this);
      break;
    case ">":
      if (nb1 > nb2)
        return options.fn(this);
      break;

  }
  return options.inverse(this);
});

Handlebars.registerHelper('getImage', function(size, images) {
  if (images)
    return new Handlebars.SafeString("http://pmcdn.priceminister.com/photo/" + images[0]["id"] + "_" + size + ".jpg");
  return "http://allinelectro.com/wp-content/uploads/2012/07/p.jpg";
});

Handlebars.registerHelper('resizeImage', function(size, image) {
  return image.slice(0, -4) + "_" + size + ".jpg";
});

Handlebars.registerHelper('getProductQuality', function(quality) {
  switch(quality) {
    case "NEW" :
      return new Handlebars.SafeString("Neuf");
    case "LIKE_NEW" :
      return new Handlebars.SafeString("Comme neuf");
    case "VERY_GOOD" :
      return new Handlebars.SafeString("Très bon état");
    case "GOOD" :
      return new Handlebars.SafeString("Bon état");
    case "ACCEPTABLE" :
      return new Handlebars.SafeString("Etat correct");
    default :
      return new Handlebars.SafeString("???");
  }
  return;
});


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function hasPagination(page, nbPages) {
  if (page < 1 || page >= nbPages)
    return false;
  return true;
}

function goTop() {
  $('html, body').animate({scrollTop:0}, 'fast');
  //window.scrollTo(0, 1);
}

var maxGridHeight = 350;
function initGrid(grid, resize) {
  if(resize)
    maxGridHeight = -1;

  $(grid).each(function() {
    //$(this).height("auto");
    maxGridHeight = maxGridHeight > $(this).height() ? maxGridHeight : $(this).height();
  });

  $(grid).each(function() {
    $(this).height(maxGridHeight + 10);
  });
}

/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
function picturefill() {
  var ps = document.getElementsByTagName( "span" );

  // Loop the pictures
  for( var i = 0, il = ps.length; i < il; i++ ){
    if( ps[ i ].getAttribute( "data-picture" ) !== null ){

      var sources = ps[ i ].getElementsByTagName( "span" ),
          matches = [];

      // See if which sources match
      for( var j = 0, jl = sources.length; j < jl; j++ ){
        var media = sources[ j ].getAttribute( "data-media" );
        // if there's no media specified, OR matchMedia is supported 
        if( !media || ( matchMedia && matchMedia( media ).matches ) ){
          matches.push( sources[ j ] );
        }
      }

      // Find any existing img element in the picture element
      var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

      if( matches.length ){
        var matchedEl = matches.pop();
        if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
          picImg = document.createElement( "img" );
          picImg.alt = ps[ i ].getAttribute( "data-alt" );
        }

        picImg.src =  matchedEl.getAttribute( "data-src" );
        matchedEl.appendChild( picImg );
      }
      else if( picImg ){
        picImg.parentNode.removeChild( picImg );
      }
    }
  }
};

  /*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);