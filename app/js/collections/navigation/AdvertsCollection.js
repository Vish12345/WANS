define([
  'backbone'
], function(Backbone){

  var AdvertsCollection = Backbone.Collection.extend({

    initialize: function( options ) {
      this.url = "/rest/navigation/v1/list";
    },

    parse: function (response, options) {
      var result = response['result'];
      
      this.query = options.data;
      this.subCategories = result['categories'];
      this.filters = result['filters'];
      this.pageTitle = result['title'];
      this.totalResultProductsCount = result['totalResultProductsCount'];

      return result['products'];
    }

  });
 
  return AdvertsCollection;
});