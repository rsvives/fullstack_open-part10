import { Text as NativeText, Platform, StyleSheet } from "react-native"
import { theme } from "../../theme"

const styles = StyleSheet.create({
    ...theme.text,
    color: theme.textColor,
    fontFamily: { fontFamily: theme.font.main }

})

export const Text = ({ size, color, style, ...props }) => {
    const textStyle = [
        styles.body1,
        styles.fontFamily,
        size === 'h1' && styles.h1,
        size === 'h2' && styles.h2,
        size === 'h3' && styles.h3,
        size === 'h4' && styles.h4,
        size === 'body1' && styles.body1,
        size === 'body2' && styles.body2,
        size === 'button' && styles.button,
        size === 'caption' && styles.caption,
        color === 'lighter' && { color: styles.color.lighter },
        color === 'default' && { color: styles.color.default },
        color === 'white' && { color: styles.color.white },
        color === 'error' && { color: styles.color.error },
        style
    ]

    return <NativeText style={textStyle} {...props} />

}

