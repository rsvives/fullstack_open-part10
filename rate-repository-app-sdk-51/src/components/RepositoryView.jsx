import { useParams } from "react-router-native"
import * as Linking from 'expo-linking';
import { useSingleRepository } from "../hooks/useSingleRepository"
import { RepositoryItem } from "./RepositoryItem"
import { Separator } from "./Separator"
import { Pressable, View, StyleSheet, FlatList } from "react-native"
import { Chip } from "./Chip"
import { Text } from "./Text";

const formatDate = (date) => `${date.getDay()}/${date.getMonth()}/${date.getYear()}`

const RepositoryInfo = ({ repository }) => {
    const style = StyleSheet.create({
        button: {
            alignSelf: 'center',
            width: '100%',
            maxWidth: 300,
        }
    })

    return (
        <>
            <RepositoryItem repo={repository} />
            <Separator />
            <Pressable style={style.button} onPress={() => openURL(repository.url)} >
                <Chip color={'primary'} style={{ textAlign: 'center' }} >Open on Github</Chip>
            </Pressable>
        </>
    )
}

const ReviewsContainer = ({ reviews }) => {

    return (
        <FlatList
            // ListHeaderComponent={<RepositoryInfo repository={repository} />}
            keyExtractor={(r) => r.id}
            data={reviews}
            renderItem={(review) => <ReviewItem review={review.item} />}
            ItemSeparatorComponent={<Separator />}
        />
    )
}

const ReviewItem = ({ review }) => {

    const style = StyleSheet.create({
        container: {

        },
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    })

    return (
        <View>
            <View style={style.top}>
                <Text size={'h3'}>{review.user.username}</Text>
                <Chip ><Text size={'h4'}>{review.rating}</Text></Chip>
            </View>
            <Text color={'lighter'} size={'caption'}>{(review.createdAt).toString('dd/mm/yyyy')}</Text>
            <Text>{review.text}</Text>
        </View>
    )
}

export const RepositoryView = () => {

    const { id } = useParams()
    const { data, loading, error } = useSingleRepository(id)

    const openURL = (url) => {
        Linking.openURL(url)
    }

    if (loading) {
        return <Text>Loading...</Text>
    } else {
        const { repository } = data
        const mappedReviews = repository.reviews.edges.map(r => r.node)

        return (
            < >
                <RepositoryInfo repository={repository} />
                <Separator />
                <ReviewsContainer reviews={mappedReviews} />
            </>
        )
    }
}