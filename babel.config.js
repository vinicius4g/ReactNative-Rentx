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
      'react-native-reanimated/plugin',
    ],
  };
};


