import { FlatList, StyleSheet, Text, View } from "react-native"
import { RepositoryItem } from "./RepositoryItem"
import { repositories } from "../../data"

const styles = StyleSheet.create({
    separator: {
        height: 8
    },
    list: {
        width: '100%'
    }

})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryList = () => {
    return (
        <FlatList
            style={styles.list}
            data={repositories}
            renderItem={(item) => <RepositoryItem repo={item.item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item) => item.id}
        />
    )

}