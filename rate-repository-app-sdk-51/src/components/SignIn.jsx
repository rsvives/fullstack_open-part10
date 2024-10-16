import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Text } from "./Text";
import { useFormik } from "formik";
import { theme } from "../../theme";

const initialValues = {
    username: '',
    password: ''
}
const styles = StyleSheet.create({
    container: {

        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        padding: theme.units.xl,
        borderRadius: theme.units.md,
        maxWidth: 500,
        gap: theme.units.md,
        width: '100%',
        borderWidth: 1,
        borderColor: theme.color.secondary
    },
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

    }
})

const SignInForm = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues,
        onSubmit
    })
    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <TextInput style={styles.input} placeholder="Username" value={formik.values.username} onChange={formik.handleChange('username')} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry value={formik.values.password} onChange={formik.handleChange('password')} />
                <Pressable style={[styles.input, styles.buttonPrimary]} onPress={formik.handleSubmit}><Text color={'white'} size={'button'} style={{ textAlign: 'center' }}>Submit</Text></Pressable>
            </View>
        </View>
    )
}



export const SignIn = () => {

    const onSubmit = (values) => {
        console.log(values);
    }

    return (<SignInForm onSubmit={onSubmit} />)
}