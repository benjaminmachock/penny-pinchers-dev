const typeDefs = `
type Customer {
_id: ID
username: String
email: String
password: String
}

type Cart {
id: ID
customer: Customer
items: [CartItem!]
}

type CartItem {
product: Product!
}

type Auth {
token: ID
customer: Customer}

input CustomerInput {
username: String!
email: String!
password: String!}

type Query {
customers: [Customer]!
customer(customerID: ID!): Customer
me: Customer}

type Mutation {
addCustomer(input: CustomerInput!): Auth
login(email: String!, password: String!): Auth
addToCart(productId: ID!):Cart
removeFromCart(productId: ID!):Cart
removeCustomer: Customer
 }
`;
export default typeDefs;
