import { View } from "react-native"
import { FlatList } from "react-native-web"
import { useUserReviews } from "../hooks/useUserReviews"
import { ReviewItem } from "./RepositoryView"
import { Separator } from "./Separator"

export const UserReviews = () => {

    const { reviews } = useUserReviews()

    return (
        <View>
            <FlatList
                keyExtractor={(r) => r.id}
                data={reviews}
                renderItem={(r) => <ReviewItem review={r.item} />}
                ItemSeparatorComponent={<Separator />}
            />
        </View>
    )
}