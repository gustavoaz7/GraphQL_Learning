const express = require('express')
const app = express()
const expressGraphQL = require('express-graphql')

app.use('/graphql', expressGraphQL({
  graphiql: true
}))


app.listen(5000, () => console.log('Server is runnning...'))