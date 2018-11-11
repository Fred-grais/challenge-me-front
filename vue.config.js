module.exports = {
    lintOnSave: true,

    configureWebpack: {
        devServer: {
            overlay: true
        },
    },

    css: {
      loaderOptions: {
          sass: {
              data: '@import "@/assets/stylesheets/vars/index.scss"; @import "@/assets/stylesheets/mixins/index.scss";'
          }
      }
    },

    chainWebpack: (config) => {
        config.plugin('fork-ts-checker').tap(options => {
            options[0].silent = false;
            // Needed to display Type checking errors in browser overlay
            options[0].async = false;
            return options;
        });
    },

};
