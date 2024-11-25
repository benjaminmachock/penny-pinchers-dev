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

type Product {
_id: ID
title: String
price:String
description: String
category: String
image: String
}

type Auth {
token: ID
customer: Customer}

input CustomerInput {
username: String!
email: String!
password: String!}

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
viewCart(cartId: ID!): Cart
me: Customer
<<<<<<< HEAD
}
=======
products: [Product]!
product(productID: ID!): Product
 }
>>>>>>> main

type Mutation {
addCustomer(input: CustomerInput!): Auth
login(email: String!, password: String!): Auth
<<<<<<< HEAD
addToCart(productId: ID!, customerId: ID!, quantity: Int!):Cart
removeFromCart(productId: ID!, customerId: ID!, quantity: Int!):Cart
=======
addProduct(input: ProductInput!): Product

>>>>>>> main
removeCustomer: Customer
removeProduct: Product
 }
`;
export default typeDefs;
