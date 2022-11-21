import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query Users($username: String, $id: ID) {
    user(username: $username, _id: $id) {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }
`;
