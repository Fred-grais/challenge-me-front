module.exports = {
  lintOnSave: true,

  configureWebpack: {
    devServer: {
      overlay: true,
      public: 'challenge-me.dev.com:8080',
      disableHostCheck: true,
    },
    devtool: 'source-map',
  },

  css: {
    loaderOptions: {
      sass: {
        data:
          '@import "@/assets/stylesheets/vars/index.scss"; @import "@/assets/stylesheets/mixins/index.scss";',
      },
    },
  },

  chainWebpack: (config) => {
    config.plugin('fork-ts-checker').tap((options) => {
      options[0].silent = false;
      // Needed to display Type checking errors in browser overlay
      options[0].async = false;
      return options;
    });

    config.module
      .rule('images')
      .test(/\.(png|jpg|gif)$/i)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.limit = 8192;
        return options;
      })
      .end();
  },
};
