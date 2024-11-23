import { gql } from "@apollo/client";

const QUERY_CUSTOMERS = gql`
  query allCustomers {
    customers {
      _id
      username
    }
  }
`;

const QUERY_SINGLE_CUSTOMER = gql`
  query singleCustomer($customerId: ID!) {
    customer(customerId: $customerId) {
      _id
      username
    }
  }
`;

const QUERY_ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

export { QUERY_CUSTOMERS, QUERY_SINGLE_CUSTOMER, QUERY_ME };
