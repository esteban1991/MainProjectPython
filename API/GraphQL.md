## GraphQL

Puede consultar la referencia de Authorization API en https://django-graphql-auth.readthedocs.io/en/latest/api/

### Users

query {
  users {
    edges {
      node {
        username,
        archived,
        verified,
        email,
        secondaryEmail,
      }
    }
  }
}

mutation {
  register(
    email: "new_user@email.com",
    username: "new_user",
    password1: "123456",
    password2: "123456",
  ) {
    success,
    errors,
    token,
    refreshToken
  }
}

mutation {
  login(
    # username or email
    email: "skywalker@email.com"
    password: "123456super"
  ) {
    success,
    errors,
    token,
    refreshToken,
    unarchiving,
    user {
      id,
      username
    }
  }
}

google-oauth2

mutation {
  passwordSet(
    token: "1eyJ1c2VybmFtZSI6InNreXdhbGtlciIsImFjdGlvbiI6InBhc3N3b3JkX3Jlc2V0In0:1itExL:op0roJi-ZbO9cszNEQMs5mX3c6s",
    newPassword1: "supersecretpassword",
    newPassword2: "supersecretpassword"
  ) {
    success,
    errors
  }
}

mutation {
  passwordReset(
    token: "1eyJ1c2VybmFtZSI6InNreXdhbGtlciIsImFjdGlvbiI6InBhc3N3b3JkX3Jlc2V0In0:1itExL:op0roJi-ZbO9cszNEQMs5mX3c6s",
    newPassword1: "supersecretpassword",
    newPassword2: "supersecretpassword"
  ) {
    success,
    errors
  }
}

mutation {
  refreshToken(
    refreshToken: "d9b58dce41cf14549030873e3fab3be864f76ce44"
  ) {
    success,
    errors,
    payload,
    refreshExpiresIn,
    token,
    refreshToken
  }
}

mutation {
  sendPasswordResetEmail(
    email: "skywalker@email.com"
  ) {
    success,
    errors
  }
}

mutation {
 passwordChange(
    oldPassword: "supersecretpassword",
    newPassword1: "123456super",
     newPassword2: "123456super"
  ) {
    success,
    errors,
    token,
    refreshToken
  }
}

mutation {
  updateAccount(
    firstName: "Luke"
  ) {
    success,
    errors
  }
}

mutation {
  verifyAccount(
    token:"eyJ1c2VybmFtZSI6InNreXdhbGtlciIsImFjdGlvbiI6ImFjdGl2YXRpb24ifQ:1itC5A:vJhRJwBcrNxvmEKxHrZa6Yoqw5Q",
  ) {
    success, errors
  }
}

mutation {
  verifyToken(
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNreXdhbGtlciIsImV4cCI6MTU3OTQ1ODY3Miwib3JpZ0lhdCI6MTU3OTQ1ODM3Mn0.rrB4sMA-v7asrr8Z2ru69U1x-d98DuEJVBnG2F1C1S0"
  ) {
    success,
    errors,
    payload
  }
}

mutation {
  deleteAccount(
    password: "supersecretpassword",
  ) {
    success,
    errors
  }
}

Protected mutations require the http Authorization header.
Authorization JWT token

## Enjoy
