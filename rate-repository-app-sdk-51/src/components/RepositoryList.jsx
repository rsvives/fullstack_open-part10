import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { useRepositories } from "../hooks/useRepositories"
import { RepositoryListItem } from "./RepositoryListItem"

const styles = StyleSheet.create({
    separator: {
        height: 8
    },
    list: {
        width: '100%',
        // marginTop: theme.units.md
    }

})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryList = () => {

    const { repositories, loading } = useRepositories()

    return (
        loading ?
            <Text style={{ textAlign: 'center', verticalAlign: 'middle', margin: 'auto' }}>Loading...</Text>
            : <RepositoryContainer repositories={repositories} />
    )


}

export const RepositoryContainer = ({ repositories }) => {


    return (
        <FlatList
            style={styles.list}
            data={repositories}
            renderItem={(item) => <RepositoryListItem item={item.item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item) => item.id}
        />
    )
}