import { gql } from "@apollo/client";

export const QUERY_CUSTOMERS = gql`
  query allCustomers {
    customers {
      _id
      username
    }
  }
`;

export const QUERY_SINGLE_CUSTOMER = gql`
  query singleCustomer($customerId: ID!) {
    customer(customerId: $customerId) {
      _id
      username
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;
