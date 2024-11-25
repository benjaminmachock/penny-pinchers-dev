const typeDefs = `
type Customer {
_id: ID
username: String
email: String
password: String
cart: [Cart]
}

type Product {
title: String
price: String
description: String
category: String
image: String
}

type Cart {
id: ID!
customer: ID!
items: [CartItem!]
}

type CartItem {
product: Product!
quantity: Int!
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
viewCart(cartId: ID!): Cart
me: Customer
}

type Mutation {
addCustomer(input: CustomerInput!): Auth
login(email: String!, password: String!): Auth
addToCart(productId: ID!, userId: ID!, quantity: Int!):Cart
removeFromCart(productId: ID!, userId: ID!):Cart
removeCustomer: Customer
 }
`;
export default typeDefs;
