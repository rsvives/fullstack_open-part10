import { StyleSheet, View } from "react-native"
import { theme } from "../../theme"

export const Card = ({ children, style }) => {
    const css = StyleSheet.create({
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
    return (<View style={{ ...css.container, ...style }}>{children}</View>)
}