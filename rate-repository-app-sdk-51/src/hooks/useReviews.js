import { useMutation } from "@apollo/client"
import { CREATE_REVIEW, DELETE_REVIEW } from "../graphql/mutations"
import { useLoggedUser } from "./useLoggedUser"
import { useNavigate } from "react-router-native"

export const useReviews = () => {
    const [createReviewMutation, createReviewResult] = useMutation(CREATE_REVIEW)
    const [deleteReviewMutation, deleteReviewResult] = useMutation(DELETE_REVIEW)
    const { loggedUser, loadingUser } = useLoggedUser()
    const navigate = useNavigate()

    const createNewReview = async (review) => {
        try {
            if (!loggedUser) throw new Error('You must be logged in')
            const { data } = await createReviewMutation({ variables: { review } })
            console.log('new review', data)
            navigate(`/repositories/${data.createReview.repositoryId}`, { replace: false })
        } catch (e) {
            console.log(JSON.stringify(e, null, 2))
            throw new Error(e)
        }
    }

    const deleteReview = async (reviewId) => {
        try {
            const { data } = await deleteReviewMutation({ variables: { deleteReviewId: reviewId } })
            if (!data?.deleteReview) throw new Error("Error deleting review")
            return data.deleteReview
        } catch (e) {
            console.log(JSON.stringify(e, null, 2))
            throw new Error(e)
        }
    }



    return { createNewReview, createReviewResult, deleteReview }

}