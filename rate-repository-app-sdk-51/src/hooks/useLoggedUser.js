import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"

export const useLoggedUser = () => {

    const { data, error: errorUSer, loading: loadingUser } = useQuery(ME, { fetchPolicy: 'cache-and-network' })

    const loggedUser = data?.me


    return { loggedUser, errorUSer, loadingUser }
}