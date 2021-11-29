module.exports = {
  apps : [
    {
      name: 'picaServerDev',
      script: '"npm run serve"',
      watch: '.',
      ignore_watch: [
        'test',
        'log',
        'static/download',
        'static/tmp',
        'node_modules'
      ],
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
      name: 'picaServerProd',
      script: '"npm run serve"',
      watch: false,
      env_production: {
        NODE_ENV: "production"
      },
    }
  ]
};
