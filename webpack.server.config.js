const WebpackShellPlugin = require('webpack-shell-plugin');

if (process.env.NODE_ENV !== 'production') {
    config.plugins.push(new WebpackShellPlugin({onBuildEnd: ['nodemon build/index.bundle.js --watch build']}));
}