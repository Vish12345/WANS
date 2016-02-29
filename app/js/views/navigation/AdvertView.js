define([
  'backbone',
  'text!templates/navigation/advertTemplate.html'
], function(Backbone, advertTemplate){

  var AdvertView = Backbone.View.extend({

    template: Handlebars.compile(advertTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function(){
      var self = this;

      var renderedContent = this.template({
        advertType: self.model.collection.query.advertType,
        advert: this.model.toJSON()
      });
      this.$el.html( renderedContent ); 
    }

  });

  return AdvertView;
});