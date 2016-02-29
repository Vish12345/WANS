define([
  'backbone',
  'router', // Request router.js
], function(Backbone, Router){

  var initialize = function(){
    Router.initialize();
  };


  return { 
    initialize: initialize
  };
});