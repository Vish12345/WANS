define([
  'jquery',
  'backbone',
  'models/advert/AdvertDetailModel',
  'collections/navigation/AdvertsCollection',
  'collections/home/SuggestsCollection',
  'views/navigation/AdvertsListView',
  'views/home/HomeView',
  'views/home/MenuView',
  'views/advert/AdvertDetailView',
  'views/user/CartListView'
], function($, Backbone, AdvertDetailModel, AdvertsCollection, SuggestsCollection, AdvertsListView, HomeView, MenuView, AdvertDetailView, CartListView) {
  
  var self = this;

  var AppRouter = Backbone.Router.extend({
    routes: {
      'search/:keyword/:pageNumber/:advertType'         : 'search',
      'navigation/:category/:pageNumber/:advertType'    : 'showNavigation',
      'advertDetail/:productID/:advertType'             : 'showAdvertDetail',
      'cart'                                            : 'cart',
      '*actions'                                        : 'defaultAction'
    }
  });
  
  var initialize = function(){
    var app_router = new AppRouter;

    var suggestsCollection = new SuggestsCollection();
    var menuView = new MenuView({
      collection: suggestsCollection,
      el: $("#menu")
    });

    app_router.on('route:search', function (keyword, pageNumber, advertType) {
      var projectsCollection = new AdvertsCollection();
      projectsCollection.fetch({
        data: {
          withoutStock: "false",
          kw: keyword,
          channel: "buyerapp",
          advertType: advertType,
          pageNumber: pageNumber
        },
        success: function(data) {
          /* TODO : CODE A DEPLACER ? */
          var projectsListView = new AdvertsListView({
            collection: projectsCollection,
            el: $("#main")
          });
        }
      });

    });

    app_router.on('route:showNavigation', function (category, pageNumber, advertType) {
      var projectsCollection = new AdvertsCollection();
      projectsCollection.fetch({
        data: {
          category: category,
          pageNumber: pageNumber,
          advertType: advertType
        },
        success: function(data) {
          /* TODO : CODE A DEPLACER ? */
          var projectsListView = new AdvertsListView({
            collection: projectsCollection,
            el: $("#main")
          });
        }
      });

    });

    app_router.on('route:showAdvertDetail', function (productID, advertType) {
        var advert = new AdvertDetailModel({productID: productID});
        advert.fetch({
          data : {
            productId: productID,
            advertType: advertType,
            loadProductDetails: "true"
          },
          success: function(data) {
            /* TODO : CODE A DEPLACER ? */
            var advertDetailView = new AdvertDetailView({
              model: advert,
              el: $("#main")
            });
          }
        });

    });

    app_router.on('route:cart', function () {
      var cartListView = new CartListView({
        el: $("#main")
      });
    });

    app_router.on('route:defaultAction', function (actions) {
      var homeView = new HomeView({
        el: $("#main")
      });
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});