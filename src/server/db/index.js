const { Client } = require("pg")

const { production, local } = require("../config/database")

const client = new Client(local)

client.connect()

module.exports = {
  query: (query, params, callback) => {
    return client.query(query, params, (err, res) => {
      callback(err, res)
    })
  }
}
