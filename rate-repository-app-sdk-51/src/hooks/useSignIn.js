import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";

export const useSignIn = () => {

    const [authenticate, result] = useMutation(AUTHENTICATE, {
        // onError: (error) => console.error(error)
    })

    const signIn = async ({ username, password }) => {
        console.log('usesignin hook', username, password)
        return await authenticate({ variables: { username, password } })
    }

    return [signIn, result]
}