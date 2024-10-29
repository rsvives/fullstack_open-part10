import { Pressable, StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native"
import { RepositoryItem } from "./RepositoryItem"
import { theme } from "../../theme"

export const RepositoryListItem = ({ item }) => {
    const navigate = useNavigate()

    const style = StyleSheet.create({
        container: {
            padding: theme.units.md,
            width: '100%',
            borderColor: theme.color.secondary,
            borderWidth: 1,
            borderRadius: theme.units.md,
            overflow: 'hidden',
            backgroundColor: theme.color.surface

        },
    })
    return (

        <Pressable style={style.container} onPress={() => navigate(`/repositories/${item.id}`, { replace: true })}>
            <RepositoryItem repo={item} />
        </Pressable>

        // "REPO"
    )
}