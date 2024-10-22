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