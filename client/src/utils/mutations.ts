import { gql } from "@apollo/client";

export const ADD_CUSTOMER = gql`
  mutation addCustomer($input: CustomerInput!) {
    addCustomer(input: $input) {
      token
      customer {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_CUSTOMER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      customer {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_CUSTOMER = gql`
  mutation removeCustomer($customer: Customer!) {
    removeCustomer(customer: $customer) {
      _id
      username
      email
      password
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($input: ProductInput!) {
    addProduct(input: $input) {
      product {
        _id
        title
        price
        description
        category
        image
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($input: Product!) {
    removeProduct(product: $product) {
      _id
      title
      price
      description
      category
      image
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($input: ReviewInput!) {
    addReview(input: $input) {
      review {
        _id
        reviewText
        rating
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($input: ReviewInput!) {
    removeReview(input: $input) {
      review {
        _id
        reviewText
        rating
      }
    }
  }
`;
