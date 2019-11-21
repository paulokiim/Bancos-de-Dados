const { Client } = require('pg');

const client = new Client();

module.exports = {
  query: (query, params, callback) => {
    return client.query(query, params, (err, res) => {
      callback(err, res);
    });
  }
}