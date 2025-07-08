const path = require('path');

function autoSubscriptionPlugin(context, options) {
  return {
    name: 'auto-subscription-plugin',
    
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              test: /\.mdx?$/,
              use: [
                {
                  loader: path.resolve(__dirname, 'subscription-loader.js'),
                  options: options,
                },
              ],
            },
          ],
        },
      };
    },
  };
}

module.exports = autoSubscriptionPlugin;
