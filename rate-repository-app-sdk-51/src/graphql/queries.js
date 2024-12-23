import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
    query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
           edges{
             node{
               ...RepositoryDetails
             }
           }
        }
    }
    ${REPOSITORY_DETAILS}
`

export const FIND_REPOSITORY = gql`
  query FindRepository($repositoryId: ID!){
  repository(id: $repositoryId) {
    ...RepositoryDetails
    url
    reviews {
      edges {
        node {
         ...ReviewDetails
        }
      }
    }
  }
}
${REPOSITORY_DETAILS}
${REVIEW_DETAILS}
`

export const GET_USERS = gql`
  query GetUsers{
    users{
      edges{
        node{
          username
        }
      }
    }
  }
`

export const ME = gql`
query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repository {
              id
              url
            }
          }
        }
      }
    }
  }
${REVIEW_DETAILS}
`