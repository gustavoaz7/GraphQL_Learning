const graphql = require('graphql')
const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql

const usersExample = [
  { id: '06', firstName: 'Gus', age: 25 },
  { id: '14', firstName: 'Sam', age: 19 },
  { id: '31', firstName: 'Ana', age: 22 }
]

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(usersExample, { id: args.id } )
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
