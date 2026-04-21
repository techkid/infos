const database = process.env.APP_DB || 'infos';
const user = process.env.APP_DB_USER || 'dev';
const password = process.env.APP_DB_PASSWORD || '1234';
const host = process.env.APP_DB_HOST || 'db';
const port = process.env.APP_DB_PORT || '5432';

// TODO pseudocode
const db = new postgres.connect(database, user, password, {
  host,
  port,
  logging: null,
});
//----------------

export default db;
