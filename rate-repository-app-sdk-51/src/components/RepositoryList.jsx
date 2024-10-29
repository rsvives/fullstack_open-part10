import { FlatList, StyleSheet, Text, View } from "react-native"
import { RepositoryItem } from "./RepositoryItem"
import { useRepositories } from "../hooks/useRepositories"
import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

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
            renderItem={(item) => <RepositoryItem repo={item.item} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item) => item.id}
        />
    )
}