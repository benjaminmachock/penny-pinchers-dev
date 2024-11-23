const typeDefs = `
type Customer {
_id: ID
username: String
email: String
password: String
}

type Auth {
token: ID
customer: Customer
 }

input CustomerInput {
username: String!
email: String!
password: String!
 }

type Query {
customers: [Customer]!
customer(customerID: ID!): Customer
me: Customer
 }

type Mutation {
addCustomer(input: CustomerInput!): Auth
login(email: String!, password: String!): Auth

removeCustomer: Customer
 }
`;
export default typeDefs;
