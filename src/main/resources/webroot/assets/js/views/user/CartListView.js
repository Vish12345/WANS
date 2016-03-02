define([
  'backbone',
  'utils',
  'text!templates/user/cartListTemplate.html'

], function(Backbone, utils, cartListTemplate){

  var CartListView = Backbone.View.extend({

    template: Handlebars.compile(cartListTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      var self = this;

      var PMCart     = localStorage ? localStorage.getObj("PM-cart") : {},
          nbProducts = _.size(PMCart),
          products   = this.getCartSortedBySeller(PMCart, nbProducts),
          cart = {
            total: this.getTotal(PMCart, nbProducts),
            nbProducts: nbProducts
          };

      var renderedContent = this.template({
        cart: cart,
        cartProducts: products
      });
      this.$el.html( renderedContent );
    },

    getCartSortedBySeller: function(products, nbProducts) {
      var cart = {};

      for(var i = 0; i < nbProducts ; ++i) {
        var seller = products[i]["seller"];
        if (!cart[seller]) {
          cart[seller] = {};
          cart[seller]["name"] = seller;
          cart[seller]["products"] = {};
        }
        cart[seller]["products"][_.size(cart[seller]["products"])] = products[i];
      }

      return cart;
    },

    getTotal: function(products, nbProducts) {
      var total = 0;
      for(var i = 0; i < nbProducts ; ++i) {
        total += parseFloat(products[i]["price"].split(" ")[0]);
      }

      return total.toFixed(2);
    }


  });

  return CartListView;

});