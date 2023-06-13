module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.ios.js',
            '.android.js',
            '.json',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
          ],
        },
      ],
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      'react-native-reanimated/plugin',
    ],
  };
};


