import { useQuery } from "@apollo/client"
import { FIND_REPOSITORY } from "../graphql/queries"

export const useSingleRepository = (id) => {

    console.log(id)
    const { data, error, loading } = useQuery(FIND_REPOSITORY, { fetchPolicy: 'cache-and-network', variables: { repositoryId: id } })

    return { data, loading, error }
}