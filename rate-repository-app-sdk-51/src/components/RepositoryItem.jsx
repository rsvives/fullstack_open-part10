import { Alert, Image, Pressable, StyleSheet, View } from "react-native"
import { Text } from "./Text"
import { theme } from "../../theme"
import { Chip } from "./Chip"
import { Separator } from "./Separator"

const styles = StyleSheet.create({

    top: {
        gap: theme.units.lg,
        flexDirection: 'row',
        // flexShrink: 1
    },
    textContainer: {
        flexGrow: 1,
        flexShrink: 1,
        // flexBasis: '100%',
        gap: theme.units.sm,
        width: 'auto',
    },
    imgContainer: {
        height: 64,
        width: 64,
        overflow: 'hidden',
        borderRadius: theme.units.xxl,
        borderWidth: 1,
        borderColor: theme.color.secondary,
    },
    img: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: theme.units.xs
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: theme.units.sm,
    }
})

export const formatDigits = (number) => (number / 1000).toFixed(1) + 'k'

export const RepositoryItem = ({ repo }) => {
    return (
        <View testID="repositoryItem" >
            <View View style={styles.top} >
                <View style={styles.imgContainer}><Image source={{ uri: repo.ownerAvatarUrl }} style={styles.img} /></View>
                <View style={styles.textContainer}>
                    <View style={styles.header}>
                        <Text size={'h4'}>{repo.fullName}</Text>
                        <Chip size={'small'} color={'secondary'}>{repo.language}</Chip>
                    </View>
                    <Text size={'body2'} color={'lighter'}>{repo.description}</Text>
                </View>
            </View >
            <Separator />
            <View style={styles.footer}>
                <Pressable onPress={() => Alert.alert(`${repo.stargazersCount} stars ⭐️`)}><Chip>{formatDigits(repo.stargazersCount)} ⭐️</Chip></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.forksCount} forks 🔱`)}><Chip>{formatDigits(repo.forksCount)} 🔱</Chip></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.ratingAverage} rating 🥇`)}><Chip>{repo.ratingAverage} 🥇</Chip></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.reviewCount} reviews 📊`)}><Chip>{repo.reviewCount} 📊</Chip></Pressable>
            </View>
        </View>

    )
}