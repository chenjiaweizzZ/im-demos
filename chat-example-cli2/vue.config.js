
module.exports = {
    parallel: false, // disable thread-loader, which is not compactible with this plugin
    configureWebpack: {
        plugins: [
            ScriptSetup({
                /* options */
            }),
        ],
    },
    chainWebpack(config) {
        // disable type check and let `vue-tsc` handles it
        config.plugins.delete("fork-ts-checker");
    },
};
