import { StyleSheet } from "react-native"
import { theme } from "../../theme"
import { View } from "react-native"

export const Separator = () => {
    const style = StyleSheet.create({
        separator: {
            paddingVertical: theme.units.md,
        },
        line: {
            borderTopWidth: 1,
            borderColor: theme.color.secondary,
        }
    })
    return (
        <View style={style.separator} >
            <View style={style.line} ></View>
        </View>
    )
}