import { useMutation } from "@apollo/client"
import { REGISTER } from "../graphql/mutations"

export const useRegister = () => {

    const [registerMutation, result] = useMutation(REGISTER)

    const registerUser = async (user) => {
        try {
            console.log('registering user', user)
            const { data } = await registerMutation({ variables: { user } })
            console.log('user registered', data)
        } catch (e) {
            throw new Error("Error while registration process", e)
        }
    }

    return { registerUser, result }
}