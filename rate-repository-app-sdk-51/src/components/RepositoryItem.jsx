import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native"
const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: '100%',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden'

    },
    top: {
        gap: 16,
        flexDirection: 'row',
        paddingBottom: 12,
        flex: 1
    },
    textContainer: {
        flexGrow: 1,
        flexShrink: 1,
        gap: 8,
        width: 'auto',
    },
    imgContainer: {
        height: 64,
        width: 64,
        overflow: 'hidden',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#eee',
        // backgroundColor: '#eee',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    description: {
        fontSize: 14,
        color: '#666'
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
        fontSize: 11,
        borderWidth: 1,
        borderColor: '#eee',
        // backgroundColor: '#eee',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 12

    }
})
export const RepositoryItem = ({ repo }) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.imgContainer}><Image source={{ uri: repo.ownerAvatarUrl }} style={styles.img} /></View>
                <View style={styles.textContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{repo.fullName}</Text>
                        <Text style={{ ...styles.tag, backgroundColor: '#eee' }}>{repo.language}</Text>
                    </View>
                    <Text style={styles.description}>{repo.description}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable onPress={() => Alert.alert(`${repo.stargazersCount} stars ⭐️`)}><Text style={styles.tag}>{repo.stargazersCount} ⭐️</Text></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.forksCount} forks 🔱`)}><Text style={styles.tag}>{repo.forksCount} 🔱</Text></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.ratingAverage} rating 🥇`)}><Text style={styles.tag}>{repo.ratingAverage} 🥇</Text></Pressable>
                <Pressable onPress={() => Alert.alert(`${repo.reviewCount} reviews 📊`)}><Text style={styles.tag}>{repo.reviewCount} 📊</Text></Pressable>
            </View>
        </View>

    )
}