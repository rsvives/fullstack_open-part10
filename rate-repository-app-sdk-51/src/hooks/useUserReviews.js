import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"

export const useUserReviews = () => {
    const { data, error: errorReviews, loading: loadingReviews, refetch: refetchUserReviews } = useQuery(ME, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network' })
    const reviews = data?.me.reviews.edges.map(r => r.node)

    return { reviews, errorReviews, loadingReviews, refetchUserReviews }

}