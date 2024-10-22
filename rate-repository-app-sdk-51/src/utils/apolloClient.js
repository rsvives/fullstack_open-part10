import { ApolloClient, InMemoryCache } from "@apollo/client";
import { LOCALHOST } from "../../config";

export const createApolloClient = () => {
    return new ApolloClient({
        uri: `http://${LOCALHOST}:4000/graphql`,
        cache: new InMemoryCache()
    })
}