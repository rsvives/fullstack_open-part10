import { useParams } from "react-router-native"
import * as Linking from 'expo-linking';
import { useSingleRepository } from "../hooks/useSingleRepository"
import { RepositoryItem } from "./RepositoryItem"
import { Separator } from "./Separator"
import { Pressable, View, Text, StyleSheet } from "react-native"
import { Chip } from "./Chip"
import { theme } from "../../theme";

export const RepositoryView = () => {

    const { id } = useParams()
    const { data, loading, error } = useSingleRepository(id)
    const style = StyleSheet.create({
        button: {
            alignSelf: 'center',
            width: '100%',
            maxWidth: 300,


        }

    })
    const openURL = (url) => {
        Linking.openURL(url)
    }

    if (loading) {
        return <Text>Loading...</Text>
    } else {
        console.log(data)
        const { repository } = data
        return (
            <View >
                <RepositoryItem repo={repository} />
                <Separator />
                <Pressable style={style.button} onPress={() => openURL(repository.url)} >
                    <Chip color={'primary'} style={{ textAlign: 'center' }} >Open on Github</Chip>
                </Pressable>

            </View>
        )
    }
}