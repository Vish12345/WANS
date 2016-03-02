define([
  'backbone'
], function(Backbone){

  var SuggestsCollection = Backbone.Collection.extend({

    initialize: function( options ) {
      this.url = "/completion";
    },

    parse: function (response, options) {
      var result = new Array(),
          len = response.length;
      for(var i=2, j=0 ; i<len; i+=2, ++j) {
        result[j] = {suggestion:response[i]};
      }
      return result;
    }

  });
 
  return SuggestsCollection;
});