import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useEffect, useState } from "react";
import { authStorage } from "../utils/authStorage";

export const useSignIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')

    const [authenticate, result] = useMutation(AUTHENTICATE, {
        // onError: (error) => console.error(error)
    })

    const signIn = async ({ username, password }) => {
        return await authenticate({ variables: { username, password } })
    }

    useEffect(() => {
        const checkToken = async () => {
            const result = await authStorage.getAccessToken()
            if (result) {
                setIsLoggedIn(true)
                setToken(result)
            }

        }
        checkToken()

    }, [])

    return { signIn, result, token, isLoggedIn }
}