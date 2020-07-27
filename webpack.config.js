const path = require('path') //This is a Node library being imported

module.exports = {
    entry: {
        index: './src/index.js',
        edit: './src/edit.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'), //this resolves the absolute path
        filename: '[name]-bundle.js' //this creates 2 files (index-bundle.js and edit-bundle.js)
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/',
        open: true
    },
    devtool: 'source-map'
}

// /home/tsaphkiel/Documents/Programming/Javascript Bootcamp/boilerplate