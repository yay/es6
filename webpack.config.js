var path = require('path');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        contentBase: 'build',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
};