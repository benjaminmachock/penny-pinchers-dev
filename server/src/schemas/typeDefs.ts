const typeDefs = `
type Customer {
_id: ID
username: String
email: String
password: String
}

type Product {
_id: ID
title: String
price: String
description: String
category: String
image: String
}

type Review {
_id: ID
reviewText: String
rating: Int
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

input ProductInput {
tilte: String
price: String
description: String
category: String
image: String
}
 
type Query {
customers: [Customer]!
customer(customerID: ID!): Customer
me: Customer
products: [Product]!
product(productID: ID!): Product
reviews: [Review]!
review(reviewID: ID!): Review
 }

type Mutation {
addCustomer(input: CustomerInput!): Auth
login(email: String!, password: String!): Auth
addProduct(input: ProductInput!): Product
addReview(input: ReviewInput!): Review

removeCustomer: Customer
removeProduct: Product
removeReview: Review
 }
`;

export default typeDefs;
