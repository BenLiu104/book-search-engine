import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
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

export const SAVE_BOOK = gql`
  mutation SaveBook(
    $authors: [String]
    $description: String
    $bookId: String
    $image: String
    $title: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      title: $title
    ) {
      _id
      username
      email
      bookCount
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
