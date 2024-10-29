import { Pressable, StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native"
import { RepositoryItem } from "./RepositoryItem"
import { theme } from "../../theme"
import { Card } from "./Card"

export const RepositoryListItem = ({ item }) => {
    const navigate = useNavigate()

    const style = StyleSheet.create({

    })
    return (

        <Pressable onPress={() => navigate(`/repositories/${item.id}`, { replace: true })}>
            <Card>
                <RepositoryItem repo={item} />
            </Card>
        </Pressable>

        // "REPO"
    )
}