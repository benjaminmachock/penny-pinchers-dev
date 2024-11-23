import { gql } from "@apollo/client";

export const QUERY_CUSTOMERS = gql`
  query allCustomers {
    customers {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_CUSTOMER = gql`
  query singleCustomer($customerId: ID!) {
    customer(customerId: $customerId) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      title
      description
      category
      image
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query singleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      title
      description
      category
      image
    }
  }
`;
