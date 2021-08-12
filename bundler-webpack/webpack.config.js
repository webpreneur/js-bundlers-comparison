
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const TerserPlugin = require("terser-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


/* The webpack"s configuration file is a standard Node.js CommonJS module */

const commonConfig = {
   /*
      An entry point indicates which module webpack should use to begin building out its internal dependency graph.
      webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).
      You can specify MULTIPLE entry points too.
   */
   entry: "./src/index.ts",
   /* The output property tells webpack where to emit the bundles it creates and how to name these files. */
   output: {
      filename: "bundle.[name].js",
      path: path.resolve("dist"),
      clean: true,
      chunkFilename: "chunk.[id].js",
   },
   // options for resolving module requests
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // extensions that are used
   },
   performance: {
      /* We recommend using hints: "error" during production builds to help prevent deploying production bundles that are too large, impacting webpage performance. */
      hints: 'warning',
      /* An entry point represents all assets that would be utilized during initial load time for a specific entry. */
      maxEntrypointSize: 400000, // int (in bytes)
      /* An asset is any emitted file from webpack.  */
      maxAssetSize: 100000, // int (in bytes)
   },
   /* 
      Out of the box, webpack only understands JavaScript and JSON files. 
      Loaders allow webpack to process other types of files and convert them into valid modules that can be added to the dependency graph.
      
      Module loaders can be chained. Each loader in the chain applies transformations to the processed resource. 
      A chain is executed in REVERSE order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. 
      Finally, webpack expects JavaScript to be returned by the last loader in the chain.
   */
   /* Loaders are transformations that are applied to the source code of a module. 
      They allow you to pre-process files as you import or “load” them. 
      Loaders are kind of like TASKS in other build tools.  */
   module: {
      // rules for modules (configure loaders, parser options, etc.)
      rules: [
         {
            /* The test property identifies which file or files should be transformed. */
            test: /\.(js|jsx)$/,
            exclude: "/node-modules/",
            /* The use property indicates which loader should be used to do the transforming. */
            use: "babel-loader" // string | string[]

         },
         /* ts-loader uses tsc, the TypeScript compiler, and relies on your tsconfig.json configuration. */
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.html$/,
            use: "html-loader"
         },
         /* In order to import a CSS file from within a JavaScript module, you need to install and add the style-loader and css-loader to your module configuration */
         {
            test: /\.(css|scss|sass)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         },
         /* As of webpack 5, we have built-in Asset Modules. */
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         /*
            Now, when you import MyImage from './my-image.png', that image will be processed and 
            added to your output directory and the MyImage variable will contain the final url of that image after processing. 
            When using the css-loader, as shown above, a similar process will occur for url('./my-image.png') within your CSS.
            The loader will recognize this is a local file, and replace the './my-image.png' path with the final path to the image in your output directory.
            The html-loader handles <img src="./my-image.png" /> in the same manner.
         */
      ]
   },
   // list of additional plugins
   plugins: [
      new webpack.DefinePlugin({
         PRODUCTION: JSON.stringify(true),
         VERSION: JSON.stringify('5fa3b9'),
         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
         EXPERIMENTAL_FEATURES: true,
      }),
      new webpack.ProgressPlugin((percentage, message, ...args) => {
         // e.g. Output each progress message directly to the console:
         console.info(percentage, message, ...args);
      }),
      /* Itt adds all the generated bundles automatically to the created index.html */
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
         filename: "[name].css"
      })
   ],
}

const devConfig = {
   devtool: 'inline-source-map',
   devServer: {
      /* This tells webpack-dev-server to serve the files from the dist directory on localhost:8080 */
      contentBase: './dist',
      /* hot module replacement. Depends on HotModuleReplacementPlugin */
      hot: true,
      // proxy URLs to backend development server
      proxy: {
         '/api': 'http://localhost:3000'
      },
      stats: 'normal',
   },
}

const prodConfig = {
   optimization: {
      splitChunks: {
         cacheGroups: {
           commons: {
             test: /[\\/]node_modules[\\/]/,
             name: "vendor",
             chunks: "initial",
           },
         },
      },
      // minimizers to use for the output files
      minimizer: [
         // This will enable CSS optimization only in production mode!
         new CssMinimizerPlugin(),
         // This plugin uses terser to minify your JavaScript.
         new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            /* Parallelization can speedup your build significantly */
            parallel: true,
            terserOptions: {
               // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
               ecma: undefined,
               parse: {},
               compress: {},
               mangle: true, // Note `mangle.properties` is `false` by default.
               module: false,
               // Deprecated
               output: null,
               format: null,
               toplevel: false,
               nameCache: null,
               ie8: false,
               keep_classnames: undefined,
               keep_fnames: false,
               safari10: false,
            },
         }),
      ],
   },
}

module.exports = (env, argv) => {

   console.log({ env, argv });

   const developmentMode = env.WEBPACK_SERVE || env.dev;

   if ( developmentMode ) {

      merge(
         commonConfig, devConfig
      );

   }

   return {
      ...commonConfig,
      ...prodConfig,
   }
}
