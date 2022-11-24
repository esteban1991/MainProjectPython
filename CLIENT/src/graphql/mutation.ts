import { gql } from '@apollo/client';

// Login mutation
export const LOGIN = gql`
mutation Login(
  $password: String!
  $username: String
  ){
    login(password: $password, username:$username) {
      success,
      errors,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username,
        email,
        companyname
      }
    }
}
`;

// Create a new record
export const CREATEJUVENTUS = gql`
  mutation CreateJuventus($input: createJuventusInput) {
    createJuventus(input: $input) {
      juventus {
        id
        name
        number
        age
        country
        appearences
        goals
        minutesPlayed
        position
      }
    }
  }
`;

// Update a record
export const UPDATEJUVENTUS = gql`
  mutation UpdateJuventus($input: updateJuventusInput) {
    updateJuventus(input: $input) {
      juventus {
        id
        name
        number
        age
        country
        appearences
        goals
        minutesPlayed
        minutesPlayed
        position
        profpic {
          name
        }
      }
    }
  }
`;

// Upload a profile picture
export const UPLOADPROFPIC = gql`
  mutation UploadProfpic($refId: ID, $ref: String, $field: String, $file: Upload!) {
    upload(refId: $refId, ref: $ref, field: $field, file: $file) {
      id
      createdAt
      updatedAt
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
    }
  }
`;

// Delete a record
export const DELETEJUVENTUS = gql`
  mutation deleteJuventus($input: deleteJuventusInput) {
    deleteJuventus(input: $input) {
      juventus {
        id
      }
    }
  }
`;
