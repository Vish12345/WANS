define([
  'backbone'
], function(Backbone) {

  var AdvertDetailModel = Backbone.Model.extend({

      initialize: function( options ) {
        this.url = "/rest/product/v1/get"
      },

      parse: function (response, options) {
        this.query = options.data;
        return response['result'];
      }

  });

  return AdvertDetailModel;

});