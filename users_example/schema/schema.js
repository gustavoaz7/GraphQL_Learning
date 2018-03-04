const graphql = require('graphql')
const axios = require('axios')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        .then(res => res.data)
      }
    }
  })
})

/*  Query Fragment 
fragment companyDetails on Company {
  id,
  name,
  description
}
use on query:  ...comapanyDetails
*/

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { 
      type: CompanyType,
      // resolve function will populate `company` property since there is no matching property from user model
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        .then(res => res.data)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id }`)
        .then(res => res.data)
      }
    },
    company: {
      type: CompanyType,
      args: {id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id }`)
        .then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
