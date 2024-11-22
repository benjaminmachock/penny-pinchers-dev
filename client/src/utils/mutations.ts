import { gql } from "@apollo/client";

export const ADD_CUSTOMER = gql`
mustation addCustomer($input: CustomerInput!) {
addCustomer(input: $input) {
token
profile {
_id
username
}
}
}
`;

export const LOGIN_CUSTOMER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
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
