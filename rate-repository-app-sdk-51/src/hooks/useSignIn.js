import { ApolloClient, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useState } from "react";
import { useAuthStorage } from "./useAuthStorage";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { ME } from "../graphql/queries";



export const useSignIn = () => {

    const authStorage = useAuthStorage()
    const navigate = useNavigate()
    const apolloClient = useApolloClient()


    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [token, setToken] = useState('')

    const [authenticate, result] = useMutation(AUTHENTICATE)

    const signIn = async ({ username, password }) => {
        try {
            const { data } = await authenticate({ variables: { username, password } })
            const { accessToken } = data.authenticate
            await authStorage.setAccessToken(accessToken)
            apolloClient.resetStore()
            navigate('/', { replace: true })
        } catch (e) {
            throw new Error('Invalid username or password', e)
        }
    }
    const logOut = async () => {
        console.log('logout')
        await authStorage.removeAccessToken()
        await apolloClient.resetStore()
        navigate('/', { replace: true })
    }


    return { signIn, result, logOut }
}