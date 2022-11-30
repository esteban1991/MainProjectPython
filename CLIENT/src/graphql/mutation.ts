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

// Register Mutation
export const REGISTER = gql`
  mutation
    register(
      $email: String!,
      $username: String!,
      $password1: String!,
      $password2: String!,
    ) {
      register(email:$email,username:$username,password1:$password1,password2:$password2){
      success,
      errors,
      token,
      refreshToken
    }
  }
`;

// Update a record
export const UPDATEUSER = gql`
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
export const DELETEUSER = gql`
  mutation deleteJuventus($input: deleteJuventusInput) {
    deleteJuventus(input: $input) {
      juventus {
        id
      }
    }
  }
`;
