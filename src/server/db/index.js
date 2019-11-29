const { Client } = require("pg")

const configs = require("../config/database")

const client = new Client(configs)

client.connect()

module.exports = {
  query: (query, params, callback) => {
    return client.query(query, params, (err, res) => {
      callback(err, res)
    })
  }
}
