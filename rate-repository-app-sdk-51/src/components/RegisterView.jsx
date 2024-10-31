import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import * as yup from 'yup'
import { Text } from "./Text"
import { SubmitButton } from "./SubmitButton"
import { useFormik } from "formik"
import { TextInput } from "./TextInput"
import { theme } from "../../theme"
import { useRegister } from "../hooks/useRegister"

export const RegisterView = () => {

    const { registerUser } = useRegister()

    const handleSubmit = async (values) => {
        console.log(values);
        const { username, password } = values
        try {
            await registerUser({ username, password })
        } catch (e) {
            console.error(e)
        }


    }
    return (
        <TouchableWithoutFeedback onPress={() => { if (Platform.OS !== 'web') Keyboard.dismiss }}>
            <View>
                <Text size={'h2'} style={{ marginBottom: theme.units.md }}>Register</Text>
                <RegisterForm onSubmit={handleSubmit} error={null} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
    username: yup.string()
        .min(5, 'Minimum length for username is 5 characteres')
        .max(30, 'Maximum length for username is 30 characteres')
        .required("Username is required"),
    password: yup.string()
        .min(5, 'Minimum length for password is 5 characteres')
        .max(50, 'Maximum length for password is 50 characteres')
        .required("Password is required"),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords don't match")
})

const RegisterForm = ({ onSubmit, error }) => {

    const styles = StyleSheet.create({
        card: {
            padding: theme.units.xl,
            borderRadius: theme.units.md,
            maxWidth: 500,
            gap: theme.units.md,
            width: '100%',
            borderWidth: 1,
            borderColor: theme.color.secondary
        },
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    return (
        <View style={styles.card}>
            <TextInput
                placeholder="Username"
                inputMode='text'
                // autoComplete='username'
                keyboardType="twitter"
                returnKeyType="next"
                autoFocus
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
            />
            {formik.touched.username && formik.errors.username &&
                <Text color={'error'}>{formik.errors.username}</Text>}
            <TextInput
                placeholder="Password"
                inputMode='text'
                autoComplete='password'
                keyboardType="visible-password"
                secureTextEntry
                returnKeyType="next"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password &&
                <Text color={'error'}>{formik.errors.password}</Text>}
            <TextInput
                placeholder="Password confirmation"
                inputMode='text'
                autoComplete='password'
                keyboardType="visible-password"
                secureTextEntry
                returnKeyType="next"
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation &&
                <Text color={'error'}>{formik.errors.passwordConfirmation}</Text>}

            <SubmitButton onSubmit={formik.handleSubmit}>Register</SubmitButton>
        </View>
    )
}