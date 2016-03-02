require.config({
  paths: {
    jquery:               'libs/jquery/jquery-1.10.2',
    underscore:           'libs/underscore/underscore',
    backbone:             'libs/backbone/backbone',
    localStorage:         'libs/backbone/backbone-localStorage',
    handlebars:           'libs/handlebars/handlebars',
    utils:                'utils',
    templates:            '../templates'
  },

  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'localStorage': {
      deps: ['backbone'],
      exports: 'localStorage'
    },
    'backbone': {
      deps: ['underscore', 'jquery', 'handlebars'],
      exports: 'Backbone'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'utils': {
      deps: ['handlebars']
    }
  }

});

require([
  'app'
], function(App){
  App.initialize();
});