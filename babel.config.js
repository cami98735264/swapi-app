module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    //if you already have other plugin just paste this lines below
    [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@hooks': './src/utils/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@assets': './src/assets',
            '@utils': './src/utils',
          },
        },
    ]
],
};
