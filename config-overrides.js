const path = require('path');

module.exports = function override(config, env) {
  // Find the SVG rule in the webpack configuration
  const svgRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));

  // Add SVGR loader to the SVG rule
  svgRule.exclude = path.join(__dirname, 'src/assets/images/logo'); // Replace 'src/icons' with your SVG directory
  svgRule.use = [
    {
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgo: false, // Optional, if you don't want to compress SVGs
        throwIfNamespace: false, // Add this option
      },
    },
    {
      loader: require.resolve('url-loader'),
      options: {
        limit: 8192, // or any other value that works for your project
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },
  ];

  return config;
};