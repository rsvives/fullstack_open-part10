import { useNavigate, useParams } from "react-router-native"
import * as Linking from 'expo-linking';
import { useSingleRepository } from "../hooks/useSingleRepository"
import { RepositoryItem } from "./RepositoryItem"
import { Separator } from "./Separator"
import { Pressable, View, StyleSheet, FlatList } from "react-native"
import { Chip } from "./Chip"
import { Text } from "./Text";
import { theme } from "../../theme";
import { useLoggedUser } from "../hooks/useLoggedUser";

const formatDate = (date) => new Date(date).toLocaleDateString('es-es')

const RepositoryInfo = ({ repository }) => {
    const navigate = useNavigate()
    const style = StyleSheet.create({
        button: {
            alignSelf: 'center',
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 1,
            maxWidth: 300,
        }
    })
    const openURL = (url) => {
        Linking.openURL(url)
    }
    const reviewRepo = () => {
        console.log('reviewing repo', repository)
        navigate(`/review/${repository.ownerName}/${repository.name}`,)
    }
    const { loggedUser } = useLoggedUser()

    return (
        <>
            <RepositoryItem repo={repository} />
            <Separator />
            <View style={{ flexDirection: 'row', gap: theme.units.md }}>
                <Pressable style={style.button} onPress={() => openURL(repository.url)} >
                    <Chip color={'primary'} style={{ textAlign: 'center' }} >Open on Github</Chip>
                </Pressable>
                {loggedUser && <Pressable style={style.button} onPress={reviewRepo} >
                    <Chip style={{ textAlign: 'center', borderColor: theme.color.primary }} >Review</Chip>
                </Pressable>
                }
            </View>
        </>
    )
}

const ReviewsContainer = ({ reviews }) => {

    return (
        <FlatList
            keyExtractor={(r) => r.id}
            data={reviews}
            renderItem={(review) => <ReviewItem title={review.item.user.username} review={review.item} />}
            ItemSeparatorComponent={<Separator />}
        />
    )
}

export const ReviewItem = ({ title, review, children }) => {

    const style = StyleSheet.create({
        container: {

        },
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: theme.units.md,
        }
    })

    return (
        <View>
            <View style={style.top}>
                <View>
                    <Text color={'lighter'} size={'caption'}>{formatDate(review.createdAt)}</Text>
                    <Text size={'h3'}>{title}</Text>
                </View>
                <Chip style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'row' }} >
                    <Text size={'h4'}>{review.rating}</Text>
                    {/* <Text style={{ fontSize: 10 }} color={'lighter'}>/100</Text> */}
                </Chip>
            </View>
            <Text>{review.text}</Text>
            {children}
        </View>
    )
}

export const RepositoryView = () => {

    const { id } = useParams()
    console.log('id', id)
    const { data, loading, error } = useSingleRepository(id)


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