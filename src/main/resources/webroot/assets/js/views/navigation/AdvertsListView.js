define([
  'backbone',
  'utils',
  'views/navigation/AdvertView',
  'text!templates/navigation/advertsListTemplate.html'

], function(Backbone, utils, AdvertView, advertsListTemplate){

  var AdvertsListView = Backbone.View.extend({

    template: Handlebars.compile(advertsListTemplate),

    initialize: function() {
      self         = this;
      collection   = this.collection;
      totalResults = collection.totalResultProductsCount;
      nbPages      = parseInt(totalResults / 20, 10);

      _.bindAll(this, 'render');
      this.collection.on('reset', this.render);
      this.render();

      $(".pagination").click(goTop());
      $(".navigation").click(goTop());
      $("#paginationForm").submit(this.changePage);
    },

    render: function() {
      var adverts       = collection.models,
          query         = collection.query,
          subCategories = collection.subCategories,
          filters       = collection.filters,
          category      = query.category ? query.category : query.kw,
          currentPage   = query.pageNumber,
          prevPage      = parseInt(currentPage, 10) - 1,
          nextPage      = parseInt(currentPage, 10) + 1;

      $("#suggestions").html("");
      $("#search").val(query.kw);

      var renderedContent = this.template({
        hasNextPage:   hasPagination(nextPage, nbPages),
        hasPrevPage:   hasPagination(prevPage, nbPages),
        nextPage:      nextPage,
        prevPage:      prevPage,
        currentPage:   currentPage,
        nbPages:       nbPages,
        advertType:    collection.query.advertType,
        title:         collection.pageTitle,
        page:          Backbone.history.fragment.split("/")[0],
        kw:            query.kw,
        category:      category,
        subCategories: subCategories,
        filters:       filters,
        adverts:       adverts
      });
      this.$el.html( renderedContent );

      _.each(adverts, function(model) {
        var advertView = new AdvertView({
          model: model,
          el: self.$el.find('#advert-' + model.id)
        });
      });

      this.highlightQuality();

      this.loadImages('.navigation .advertItem');

    },

    loadImages: function(grid){
      picturefill();
      initGrid(grid, false);

      if( addEventListener ){
        addEventListener( "resize", function(){
          picturefill();
          initGrid(grid, true);
        }, false );
      }
      else if( attachEvent ){
        attachEvent( "onload", function(){
          picturefill();
          initGrid(grid, false);
        } );
      }
    },

    changePage: function(evt) {
      evt.preventDefault();
      var query = self.collection.query,
          page  = parseInt(evt.target.children[0].value);

      if (page >= nbPages) page = nbPages;
      window.location = "#navigation/" + query.category + "/" +  page + "/" + query.advertType;
    },

    highlightQuality: function() {
      $(".displayBy .filter[data-filter='" + self.collection.query.advertType +"']").addClass("active");
    }

  });

  return AdvertsListView;

});