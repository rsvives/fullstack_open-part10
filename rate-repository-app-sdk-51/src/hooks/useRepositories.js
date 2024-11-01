import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"
import { SORTING_OPTIONS } from "../components/RepositoryList"

export const useRepositories = (sortingOption) => {

    const order = {
        [SORTING_OPTIONS.LATEST]: {
            orderBy: 'CREATED_AT',
            orderDirection: 'DESC'
        },
        [SORTING_OPTIONS.HIGHEST_RANKED]: {
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'DESC'
        },
        [SORTING_OPTIONS.LOWEST_RANKED]: {
            orderBy: 'RATING_AVERAGE',
            orderDirection: 'ASC'
        },
    }

    const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network', variables: { ...order[sortingOption] } })
    const repositories = data?.repositories.edges.map(e => e.node)

    return { repositories, loading, error }
}
