import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from 'expo-constants';

export const createApolloClient = () => {

    const { apolloUri } = Constants.expoConfig.extra

    return new ApolloClient({
        uri: `${apolloUri}`,
        cache: new InMemoryCache()
    })
}