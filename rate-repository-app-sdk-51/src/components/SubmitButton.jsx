import { Pressable, StyleSheet } from "react-native"
import { Text } from "./Text"
import { theme } from "../../theme"

export const SubmitButton = ({ children, onSubmit }) => {

    const styles = StyleSheet.create({
        input: {
            paddingVertical: theme.units.sm,
            paddingHorizontal: theme.units.md,
            borderRadius: theme.units.xs,
            borderWidth: 1,
            borderColor: theme.color.secondary
        },
        buttonPrimary: {
            paddingVertical: theme.units.md,
            backgroundColor: theme.color.primary,
            borderColor: theme.color.primary,
        },
    })

    return (
        <Pressable style={[styles.input, styles.buttonPrimary]} onPress={onSubmit}>
            <Text color={'white'} size={'button'} style={{ textAlign: 'center' }}>
                {children}
            </Text>
        </Pressable>
    )
}