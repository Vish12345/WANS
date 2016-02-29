define([
  'backbone',
  'text!templates/advert/advertDetailTemplate.html'
], function(Backbone, advertDetailTemplate){

  var AdvertDetailView = Backbone.View.extend({

    template: Handlebars.compile(advertDetailTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      this.model.on('change', this.render, this);
      this.render();

      // DIRTY : events needs to be called outside "events" attribute because they will fire as mush as you render the view
      $(".addToCart").click(this.addToCart);
      $(".advertItem").click(this.showActions);
    },

    render: function(){
      var self = this;
      var product   = this.model.toJSON(),
          query     = this.model.query,
          prevPage  = parseInt(query.pageNumber, 10) - 1,
          nextPage  = parseInt(query.pageNumber, 10) + 1,
          nbAdverts;

      if (query.advertType == "ALL")
        nbAdverts = product.advertsCount;
      else if (query.advertType == "NEW")
        nbAdverts = product.advertsNewCount;
      else if (query.advertType == "USED")
        nbAdverts = product.advertsUsedCount;


      /*var startTime = new Date().getTime(),
          perf = performance.timing

      var renderedContent = this.template({
        productId: self.model.id,
        product: product,
        timing : {
          "total" :   perf.loadEventEnd - perf.navigationStart,
          "request" : perf.responseEnd - perf.requestStart,
          "load" :    perf.loadEventEnd - perf.responseEnd
        }
      });
      this.$el.html( renderedContent );*/
      //$('html, body').animate({scrollTop:0}, 'slow'); // TODO : correct this window.scrollTo(0, 1)


      //$(".client").text("Client : " + (new Date().getTime() - startTime) + "ms");

      var renderedContent = this.template({
        hasNextPage:   hasPagination(nextPage, nbAdverts, 5),
        hasPrevPage:   hasPagination(prevPage, nbAdverts, 5),
        nextPage:      nextPage,
        advertType:    query.advertType,
        prevPage:      prevPage,
        productId:     self.model.id,
        product:       product
      });
      this.$el.html( renderedContent );

      this.highlightQuality();

      mainInformations = {
        caption: product.caption,
        headline: product.headline,
        topic: product.topic,
        imageID: product.images["0"].id
      }
    },

    highlightQuality: function() {
      $(".displayBy .filter[data-filter='" + this.model.query.advertType +"']").addClass("active");
    },

    showActions: function(evt) {
      var elm = $(evt.target);
      if (!elm.hasClass("addToCart")) {
        if (!elm.hasClass("advertItem"))
          elm = elm.parents(".advertItem");

        elm.children(".actions").toggleClass("uiShow");
      }
    },

    goTop: function() {
      goTop();
    },

    addToCart: function(evt) {
      var product = {
        infos: mainInformations,
        price : $(evt.target).parents('.advertItem').find('.price .value').get("0").innerHTML,
        quality : $(evt.target).parents('.advertItem').find('.price .quality').get("0").innerHTML,
        seller: $(evt.target).parents('.advertItem').find('.seller .name .value').get("0").innerHTML
      };
      var cart       = localStorage.getObj("PM-cart") || {},
          nbProducts = parseInt(_.size(cart), 10) || 0;

      cart[nbProducts] = product;
      localStorage.setObj("PM-cart", cart);
    }

  });

  return AdvertDetailView;
});