import * as yup from 'yup'
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Text } from "./Text";
import { useFormik } from "formik";
import { theme } from "../../theme";
import { useSignIn } from '../hooks/useSignIn';
import { useState } from 'react';


const styles = StyleSheet.create({
    container: {

        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'flex-start',
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
    },
    inputError: {
        borderColor: theme.color.error
    }
})

const initialValues = {
    username: '',
    password: ''
}
const validationSchema = yup.object().shape({
    username: yup.string()
        .min(5, ({ min }) => `Username has to be at least ${min} characters long`)
        // .test('min', 'Username has to be at leas 5 characters long', val => val.length >= 5)
        .required('Username is required')
    ,
    password: yup.string()
        // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        // .matches(/\d/, "Password must have a number")
        // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        // .min(8, ({ min }) => `Password has to be at least ${min} characters long`)
        .required('password is required')
})

const SignInForm = ({ onSubmit, error }) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })


    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <TextInput
                    style={[
                        styles.input,
                        formik.touched.username && formik.errors.username && styles.inputError
                    ]}

                    inputMode='email'
                    placeholder="Username"
                    returnKeyType='next'
                    onSubmitEditing={() => console.log('end ed')
                    }
                    keyboardType='web-search'
                    autoComplete='username'
                    autoFocus
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                />

                {formik.touched.username && formik.errors.username &&
                    <Text color={'error'}>{formik.errors.username}</Text>}

                <TextInput
                    style={[
                        styles.input,
                        formik.touched.password && formik.errors.password && styles.inputError
                    ]}
                    inputMode='text'
                    secureTextEntry
                    returnKeyType='go'
                    value={formik.values.password}
                    placeholder="Password"
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                />

                {formik.touched.password && formik.errors.password &&
                    <Text color={'error'}>{formik.errors.password}</Text>}

                <Pressable style={[styles.input, styles.buttonPrimary]} onPress={formik.handleSubmit}><Text color={'white'} size={'button'} style={{ textAlign: 'center' }}>Submit</Text></Pressable>
                {error && <Text color={'error'} style={{ textAlign: 'center' }}>{error}</Text>}
            </View>
        </View >
    )
}



export const SignIn = () => {
    const { signIn } = useSignIn()
    const [error, setError] = useState(null)

    const onSubmit = async (values) => {
        console.log(values)
        const { username, password } = values
        try {
            await signIn({ username, password })
            setError(null)
        } catch (e) {
            console.error('error', e)
            setError(e.message)
        }
    }

    return (<SignInForm error={error} onSubmit={onSubmit} />)
}