// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'ec2-18-232-232-96.compute-1.amazonaws.com',
      user: 'vdasqathhiljqp',
      password:
        'ec246036eea51c356fc3ae8104604fcd646ae4673e005cd36540b9d3e93a92e1',
      database: 'd5b6ns1309a4ge',
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },

  production: {
    client: 'ec2-18-232-232-96.compute-1.amazonaws.com',
    connection: {
      database: 'd5b6ns1309a4ge',
      user: 'vdasqathhiljqp',
      password:
        'ec246036eea51c356fc3ae8104604fcd646ae4673e005cd36540b9d3e93a92e1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
