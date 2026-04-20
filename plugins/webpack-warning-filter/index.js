module.exports = function webpackWarningFilterPlugin() {
  return {
    name: 'webpack-warning-filter',
    configureWebpack() {
      return {
        ignoreWarnings: [
          (warning) => {
            const message = warning && warning.message ? warning.message : '';
            const moduleIdentifier =
              warning && warning.module && warning.module.identifier
                ? warning.module.identifier()
                : warning && warning.moduleIdentifier
                  ? warning.moduleIdentifier
                  : '';

            return (
              message.includes('require function is used in a way in which dependencies cannot be statically extracted') &&
              moduleIdentifier.includes('vscode-languageserver-types') &&
              moduleIdentifier.includes('lib/umd/main.js')
            );
          },
        ],
      };
    },
  };
};
