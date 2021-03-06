var webpack = require('webpack');

module.exports = {  
  entry: './src/react/main.tsx',
  output: {
    path: './public/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  // devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
  },
  externals: {
    /*
    jquery: {
        root: 'jquery',
        commonjs2: 'jquery',
        commonjs: 'jquery',
        amd: 'jquery',
    },
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
    }
    'react-router': {
        root: 'ReactRouter',
        commonjs2: 'react-router',
        commonjs: 'react-router',
        amd: 'react-router',
    }*/
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        NODE_ENV: 'development'
    })
  ],
}