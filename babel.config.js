module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          services: './src/services',
          store: './src/store',
          utils: './src/utils',
          assets: './src/assets',
          styles: './src/styles',
          types: './src/types',
          libs: './src/libs',
          config: './src/config',
          'axios-config': './src/libs/axios-config',
          reactquery: './src/libs/reactquery',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
