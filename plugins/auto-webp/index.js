/**
 * Docusaurus plugin: auto-webp
 *
 * Automatically serves optimized WebP images in place of original JPEG/PNG files.
 * For any image import (e.g. ./Bugs.png), if a corresponding
 * Bugs-optimized.webp file exists in the same directory, it is served instead.
 *
 * This works transparently with:
 *   - Markdown images:  ![alt](./image.png)
 *   - JSX require:      <img src={require('./image.jpg').default} />
 *   - ES imports:       import img from './image.png'
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = function pluginAutoWebp() {
  return {
    name: 'docusaurus-plugin-auto-webp',
    configureWebpack() {
      return {
        plugins: [
          new webpack.NormalModuleReplacementPlugin(
            /\.(jpe?g|png)$/i,
            (resource) => {
              let request = resource.request;
              const context = resource.context;
              if (!request || !context) return;

              // Skip already-optimized files
              if (request.includes('-optimized')) return;

              // Webpack inline loaders use "!" as separator:
              //   !<loader1>!<loader2>!./actual-file.png
              // Extract the actual file path (last segment after "!")
              let loaderPrefix = '';
              if (request.includes('!')) {
                const lastBang = request.lastIndexOf('!');
                loaderPrefix = request.substring(0, lastBang + 1);
                request = request.substring(lastBang + 1);
              }

              // Resolve the absolute path from context + request
              let absPath;
              if (path.isAbsolute(request)) {
                absPath = request;
              } else {
                absPath = path.resolve(context, request);
              }

              const ext = path.extname(absPath).toLowerCase();
              if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

              const baseName = path.basename(absPath, ext);
              const dir = path.dirname(absPath);
              const webpPath = path.join(dir, `${baseName}-optimized.webp`);

              if (fs.existsSync(webpPath)) {
                // Rewrite the request to point at the optimized WebP
                // Re-attach loader prefix if present
                resource.request = loaderPrefix + webpPath;
              }
            }
          ),
        ],
      };
    },
  };
};
