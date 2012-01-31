// This is the main Backbone Boilerplate build configuration file.
//
// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  lint: {
    files: ["build/config.js", "app/**/*.js", "lib/**/*.js", "routes/*.js", "app.js"]
  },

  concat: {

    // The core library files
    "assets/js/src/libs.js": [
      "assets/js/libs/underscore.js",
      "assets/js/libs/backbone.js"
      //"assets/js/libs/handlebars.1.0.0.beta.2.js"
    ],

    // Application files
    //"dist/debug/js/app.js": ["app/namespace.js", "app/modules/**/*.js", "app/index.js"],

    // Your CSS
    "assets/css/src/style.css": ["assets/css/base.css", "assets/css/skeleton.css", "assets/layout.css"]
  },

  stitch: {
    "assets/js/src/app.js": {
      paths: [ "app" ]
    }
  },

  jst: {
    "dist/debug/js/templates.js": ["app/templates/**/*.html"]
  },

  "handlebars-jst": {
    "dist/debug/js/templates.js": ["app/templates/**/*.hbs"]
  },

  min: {
    "assets/js/src/libs.min.js": ["assets/js/src/libs.js"],
    //"dist/release/js/templates.js": ["dist/debug/js/templates.js"],
    "assets/js/src/app.min.js": ["assets/js/src/app.js"]
  },

  mincss: {
    "assets/css/src/style.css": ["assets/css/src/style.css"]
  },

  watch: {
    files: ["assets/**/*", "app/**/*"],
    tasks: "concat stitch",

    min: {
      files: ["assets/**/*", "app/**/*"],
      tasks: "default"
    },

    stitch: {
      files: ["app/modules/**/*"],
      tasks: "lint:files stitch"
    }
  },

  clean: {
    folder: "dist/"
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint:files stitch concat min mincss");
