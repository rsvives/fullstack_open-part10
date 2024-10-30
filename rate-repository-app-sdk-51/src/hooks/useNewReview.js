import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"
import { useLoggedUser } from "./useLoggedUser"
import { useNavigate } from "react-router-native"

export const useNewReview = () => {
    const [createReviewMutation, result] = useMutation(CREATE_REVIEW)
    const { loggedUser, loadingUser } = useLoggedUser()
    const navigate = useNavigate()

    const createNewReview = async (review) => {
        try {
            if (!loggedUser) throw new Error('You must be logged in')
            const { data } = await createReviewMutation({ variables: { review } })
            console.log('new review', data)
            navigate(`/repositories/${data.createReview.repositoryId}`, { replace: true })
        } catch (e) {
            console.log(JSON.stringify(e, null, 2))
            throw new Error(e)
        }
    }
    return { createNewReview, result }

}