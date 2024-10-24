import { gql } from "@apollo/client";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
    query GetRepositories{
        repositories{
           edges{
             node{
               ...RepositoryDetails
             }
           }
        }
    }
    ${REPOSITORY_DETAILS}
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
query Me{
  me {
    id
    username
  }
}
`