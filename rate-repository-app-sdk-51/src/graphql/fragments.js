import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
fragment RepositoryDetails on Repository{
    id,
    createdAt,
    fullName,
    name,
    ownerName,
    description,
    forksCount,
    language,
    ownerAvatarUrl,
    ratingAverage,
    reviewCount,
    stargazersCount,
}
`
export const REVIEW_DETAILS = gql`
fragment ReviewDetails on Review{
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
}
` 