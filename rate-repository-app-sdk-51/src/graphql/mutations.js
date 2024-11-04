import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation Authenticate($username: String!, $password: String!){
    authenticate(credentials: { username: $username, password: $password }) {
        accessToken
    }
}
`
export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
        createdAt
        userId
        text
        repositoryId
        user {
            username
            id
        }
    }
}
`

export const REGISTER = gql`
    mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
        username
            id
            createdAt
        }
    }
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`