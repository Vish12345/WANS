define([
  'backbone',
  'text!templates/home/homeTemplate.html', 
], function(Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({

    template: Handlebars.compile(homeTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      /*var startTime = new Date().getTime(),
          perf = performance.timing
      var renderedContent = this.template({
        timing : {
          "total" :   perf.loadEventEnd - perf.navigationStart,
          "request" : perf.responseEnd - perf.requestStart,
          "load" :    perf.loadEventEnd - perf.responseEnd
        }
      });
      this.$el.html( renderedContent );

      $(".client").text("Client : " + (new Date().getTime() - startTime) + "ms");*/

      var renderedContent = this.template({});
      this.$el.html( renderedContent );
    }

  });

  return HomeView;
});