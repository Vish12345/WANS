define([
  'backbone',
  'text!templates/home/menuTemplate.html'
], function(Backbone, menuTemplate){

  var MenuView = Backbone.View.extend({

    template: Handlebars.compile(menuTemplate),

    events : {
      "submit .search_form" : "formSearch",
      "click .suggestItem" : "suggestSearch",
      "click .menuItem" : "openMenu",
      "click .category" : "closeNavigation",
      "keyup .searchInput" : "startAutocomplete"
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.collection.on('change', this.render);
      this.render();
      self = this;
      searchTimeout = null;
      suggestList = $("#suggestions");
    },

    render: function() {
      var renderedContent = this.template();
      this.$el.html( renderedContent );
    },

    formSearch: function() {
      this.searchKw($(".search_form input[name=search]").val());
      return false;
    },

    suggestSearch: function(evt) {
      this.searchKw($(evt.target).html());
      return false;
    },

    searchKw: function(value) {
      // TODO : encoder les caractères speciaux
      window.location = "/proto/#search/" + value + "/1/ALL";
    },

    openMenu: function(evt) {
      var elm = $(evt.target),
          content = $("." + elm.data("elm"));

      elm.toggleClass("uiShow");
      content.toggleClass("uiShow");

      // close all tabs
      $(".menuItem").not(elm).removeClass("uiShow");
      $(".menuContent").not(content).removeClass("uiShow");

      // put focus on search input when open searchbar
      if (content.hasClass("search") && content.hasClass("uiShow"))
        $(".searchInput").focus();

      // empty suggestions on open/close menu item
      $("#suggestions").html("");

    },

    closeNavigation: function() {
      $(".menuItem").removeClass("uiShow");
      $(".menuContent").removeClass("uiShow");
    },

    startAutocomplete: function(evt) {
      var text = $(evt.target).val().replace(/[ùûü]/g,"u").replace(/[îï]/g,"i").replace(/[àâä]/g,"a").replace(/[ôö]/g,"o").replace(/[éèêë]/g,"e").replace(/ç/g,"c");

      if(text.length == 0) {
        suggestList.html("");
      } else {
        clearTimeout(self.searchTimeout);
        self.searchTimeout = setTimeout(function(){
          self.collection.fetch({
            data: {
              q: text,
              c: "fr"
            },
            success : function ( response ) {
              response = response.models;
              var str = "",
                  nbItem = 10;
              if(response.length > 0) {
                for(var i = 0; i < nbItem; i++) {
                  var rep = response[i].get("suggestion");
                  if (rep != undefined) {
                      str += "<li class=\"suggestItem\">" + rep + "</li>";
                  }
                }
              }
              suggestList.html(str);
            }
          });
        }, 200);
      }

    }

  });

  return MenuView;
});