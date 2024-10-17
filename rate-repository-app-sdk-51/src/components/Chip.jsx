import { theme } from "../../theme"
import { Text } from "./Text"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: theme.units.md,
        paddingVertical: theme.units.sm,
        borderRadius: theme.units.lg,
        color: theme.textColor.default,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.color.secondary,
        backgroundColor: 'transparent',
    },
    small: {
        paddingHorizontal: theme.units.sm,
        paddingVertical: theme.units.xs,
        borderRadius: theme.units.md,
        fontSize: 10
    },
    backgroundColorPrimary: {
        backgroundColor: theme.color.primary,
        color: theme.textColor.white,
    },
    backgroundColorSecondary: {
        backgroundColor: theme.color.secondary,
    }
})

export const Chip = ({ color, size, children, style }) => {

    const chipStyle = [
        styles.chip,
        size === 'small' && styles.small,
        color === 'primary' && styles.backgroundColorPrimary,
        color === 'secondary' && styles.backgroundColorSecondary,
        style
    ]

    return <Text size={'body2'} style={chipStyle}>{children}</Text>
}