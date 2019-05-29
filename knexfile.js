module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL || {
    user: "admin",
    password: "admin",
    database: "bridge-applications-local",
    port: "5436"
    
  },
  migrations: {
    directory: `${__dirname}/db/migrations`
  },
  seeds: {
    directory: `${__dirname}/db/seeds`
  }
};
