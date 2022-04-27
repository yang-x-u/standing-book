module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.253.253.237:3391/',  // 跨域目标主机，自行修改
        ws: true,  // 代理 websockets
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''  // 重写地址
        }
      },
    }
  },
    chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '网板管理系统';
        return args;
      });
    }
};
