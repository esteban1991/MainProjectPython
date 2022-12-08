import { gql } from '@apollo/client';

// Login mutation
export const LOGIN = gql`
mutation Login(
  $password: String!
  $username: String
  $email: String
  ){
    login(password: $password, username:$username, email:$email) {
      success,
      errors,
      token,
      refreshToken,
      unarchiving,
      user {
        id,
        username,
        email,
        companyname,
        colorprimary,
        navtheme

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

// Activate Mutation
export const ACTIVATE = gql`
  mutation
    verifyAccount(
      $token: String!,
    ) {
      verifyAccount(token:$token){
      success,
      errors
    }
  }
`;

// sendPasswordResetEmail Mutation
export const SENDPASSRESETEMAIL = gql`
  mutation
  SendPasswordResetEmail(
      $email: String!,
    ) {
      sendPasswordResetEmail(email:$email){
      success,
      errors
    }
  }
`;

// PasswordReset
export const PASSWORDRESET = gql`
  mutation
  passwordReset(
      $token: String!,
      $newPassword1: String!,
      $newPassword2: String!,
    ) {
      passwordReset(token:$token,newPassword1:$newPassword1,newPassword2:$newPassword2){
      success,
      errors
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
