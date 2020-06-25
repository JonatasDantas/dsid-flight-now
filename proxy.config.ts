const proxy = [
    {
      context: '/api',
      target: 'http://localhost:4300',
      pathRewrite: {'^/api' : ''}
    }
  ];

module.exports = proxy;
