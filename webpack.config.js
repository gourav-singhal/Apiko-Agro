const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { port: nodePort } = require('./server/config/config');


const VENDOR_LIBS = [
  'react-hot-loader', 'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'react-color',
  'react-google-maps', 'react-i18nify', 'react-router', 'react-router-redux',
  'semantic-ui-react', 'redux-thunk', 'moment', 'babel-polyfill',
];

module.exports = {
  entry: {
    bundle: './client/index.js',
    vendor: VENDOR_LIBS
  },

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'dist/[name].[hash].js',
    chunkFilename: 'dist/[name].[hash].js',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'client'),
      'node_modules',
    ]
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   enforce: "pre",
      //   use: ['eslint-loader'],
      // },
      {
        test: /\.json?$/,
        use: ['json-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        use: ['file-loader'],
      },
      {
        use: ['babel-loader'],
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'client'),
        ],
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      }
    ]
  },

  devServer: {
    port: 3030,
    proxy: {
      '/': {
        target: `http://[::1]:${nodePort}`,
        bypass(req, res, proxyOptions) {
          // only js, css and html file serving via webpack-dev-server
          if (req.url.search(/(\.js)|(\.html)|(\.css)/g) !== -1) {
            return req.url;
          }

          if (req.url.search('/api') === -1 && req.url.search('.') !== -1) {
            return '/index.html';
          }

          // rest of request rewrite to node server
          return false;
        },
      },
    },
  },
  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ]
};
