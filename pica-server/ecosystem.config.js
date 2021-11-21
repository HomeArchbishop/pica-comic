module.exports = {
  apps : [
    {
      name: 'picaServerDev',
      script: 'npm run serve',
      watch: '.',
      ignore_watch: [
        'log',
        'static/download',
        'node_modules'
      ],
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
      name: 'picaServerProd',
      script: 'npm run serve',
      watch: false,
      env_production: {
        NODE_ENV: "production"
      },
    }
  ]
};
