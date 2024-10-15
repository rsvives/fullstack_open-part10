import { Text as NativeText, StyleSheet } from "react-native"
import { theme } from "../../theme"

const styles = StyleSheet.create({
    ...theme.text,
    textColor: {
        ...theme.textColor,
    }


})

export const Text = ({ size, color, style, ...props }) => {
    const textStyle = [
        styles.body1,
        size === 'h1' && styles.h1,
        size === 'h2' && styles.h2,
        size === 'h3' && styles.h3,
        size === 'h4' && styles.h4,
        size === 'body1' && styles.body1,
        size === 'body2' && styles.body2,
        size === 'button' && styles.button,
        size === 'caption' && styles.caption,
        color === 'lighter' && styles.textColor.lighter,
        color === 'default' && styles.textColor.default,
        color === 'white' && styles.textColor.white,
        style
    ]

    return <NativeText style={textStyle} {...props} />

}

