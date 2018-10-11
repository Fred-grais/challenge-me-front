module.exports = {
    lintOnSave: true,

    configureWebpack: {
        devServer: {
            overlay: true
        },
    },

    chainWebpack: (config) => {
        config.plugin('fork-ts-checker').tap(options => {
            console.log(options[0].vue);
            options[0].silent = false;
            // Needed to display Type checking errors in browser overlay
            options[0].async = false;
            return options;
        });
    },

};
