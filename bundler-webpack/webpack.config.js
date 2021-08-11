const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/* The webpack"s configuration file is a standard Node.js CommonJS module */

module.exports = {
   /*
      An entry point indicates which module webpack should use to begin building out its internal dependency graph.
      webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).
      You can specify MULTIPLE entry points too.
   */
   entry: "./src/index.ts",
   /* The output property tells webpack where to emit the bundles it creates and how to name these files. */
   output: {
      filename: "bundle.js",
      path: path.resolve("dist"),
      clean: true,
   },
   devtool: 'inline-source-map',
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
   optimization: {
      // minimizers to use for the output files
      // This will enable CSS optimization only in production mode!
      minimizer: [
         new CssMinimizerPlugin(),
      ],
   },
   /* 
      Out of the box, webpack only understands JavaScript and JSON files. 
      Loaders allow webpack to process other types of files and convert them into valid modules that can be added to the dependency graph.
      
      Module loaders can be chained. Each loader in the chain applies transformations to the processed resource. 
      A chain is executed in REVERSE order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. 
      Finally, webpack expects JavaScript to be returned by the last loader in the chain.
   */
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
            test: /\.(scss|sass)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         }
      ]
   },
   // list of additional plugins
   plugins: [
      /* Itt adds all the generated bundles automatically to the created index.html */
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
         filename: 'styles.css',
      })
   ],
}
 