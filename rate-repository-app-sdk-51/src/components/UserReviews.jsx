import { Pressable, View, StyleSheet, FlatList, Alert, Platform } from "react-native"
import { useUserReviews } from "../hooks/useUserReviews"
import { ReviewItem } from "./RepositoryView"
import { Separator } from "./Separator"
import { Chip } from "./Chip"
import { Text } from "./Text"
import { theme } from "../../theme"
import { Card } from "./Card"
import { useNavigate } from "react-router-native"
import { Icon } from "react-native-paper"
import { useReviews } from "../hooks/useReviews"

export const UserReviews = () => {

    const { reviews, refetchUserReviews } = useUserReviews()

    return (
        <View>
            <Text size={'h2'} style={{ marginBottom: theme.units.md }}>My reviews</Text>
            <Card>

                <FlatList
                    keyExtractor={(r) => r.id}
                    data={reviews}
                    renderItem={(r) => <ReviewItem title={r.item.repositoryId} review={r.item} children={<ReviewActions review={r.item} refetch={refetchUserReviews} />} />}
                    ItemSeparatorComponent={<Separator />}
                />
            </Card>
        </View>
    )
}

const ReviewActions = ({ review, refetch }) => {
    const style = StyleSheet.create({
        button: {
            alignSelf: 'center',
        },
        chip: {
            // textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            gap: theme.units.sm,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    const navigate = useNavigate()
    const { deleteReview: deleteReviewMutation } = useReviews()


    const dismissAlert = (alert) => {
        alert.dismiss()
    }
    const deleteReview = async () => {
        try {
            const deletedReview = await deleteReviewMutation(review.id)
            if (deletedReview) refetch()
        } catch (e) {
            console.error(e)
        }

    }

    const handleDelete = () => {
        const title = 'Deleting Review'
        const message = 'Are you sure you want to delete permanently this review?'

        if (Platform.OS === 'web') {
            if (window.confirm(message)) deleteReview()
        } else {
            Alert.alert(title, message, [{ text: 'No' }, { text: 'Yes, delete', onPress: deleteReview }])
        }
    }

    return (
        <View style={{ marginTop: theme.units.md, flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', gap: theme.units.md, flexWrap: 'wrap' }}>
            <Pressable style={style.button} onPress={handleDelete}  >
                <Chip style={style.chip} >
                    <Icon source={'delete-outline'} size={theme.units.lg} color={theme.color.primary} />
                    Delete Review
                </Chip>
            </Pressable>
            <Pressable style={style.button} onPress={() => navigate(`/repositories/${review.repositoryId}`)} >
                <Chip style={style.chip} >
                    <Icon source={'eye-outline'} color={theme.color.primary} size={theme.units.lg} />
                    See Repository
                </Chip>
            </Pressable>

        </View >

    )
}