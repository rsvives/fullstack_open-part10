import { StyleSheet } from "react-native";
import { TextInput as NativeInput } from "react-native";
import { theme } from "../../theme";

export const TextInput = ({ style, ...props }) => {
    const inputStyle = StyleSheet.create({
        input: {
            paddingVertical: theme.units.sm,
            paddingHorizontal: theme.units.md,
            borderRadius: theme.units.xs,
            borderWidth: 1,
            borderColor: theme.color.secondary
        },
    })
    return (
        <NativeInput style={[inputStyle.input, style]} {...props} />
    )
}