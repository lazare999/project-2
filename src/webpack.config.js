module.exports = {
    // ... (other configuration properties)
    module: {
      rules: [
        // ... (other rules)
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };