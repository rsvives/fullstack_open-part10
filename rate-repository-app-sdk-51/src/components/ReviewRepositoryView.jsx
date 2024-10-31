import * as yup from 'yup'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigate, useParams } from "react-router-native"
import { Text } from "./Text"
import { Pressable, StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { Chip } from "./Chip"
import { theme } from "../../theme"
import { useFormik } from 'formik';
import { useNewReview } from '../hooks/useNewReview';
import { useState } from 'react';


export const ReviewRepositoryView = () => {
    const params = useParams()
    const { owner, repository } = params
    const navigate = useNavigate()
    const { createNewReview } = useNewReview()
    const [error, setError] = useState(null)

    // const [error, setError] = useState(null)
    const handleSubmit = async (values) => {
        console.log('submiting', values)
        const review = {
            ownerName: owner,
            repositoryName: repository,
            rating: Number(values.rating),
            text: values.review
        }
        try {
            await createNewReview(review)
            setError(null)
        } catch (e) {
            console.error(e)
            setError(e.message)
        }
    }


    return (
        <>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: theme.units.md, alignItems: 'center', marginBottom: theme.units.lg, }}>
                <Pressable onPress={() => navigate(`/repositories/${owner}.${repository}`)}>
                    <Chip style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: theme.units.sm }} >
                        <MaterialIcons name="arrow-back" size={theme.units.lg} color="black" />
                    </Chip>
                </Pressable>
                <Text style={{ flexGrow: 1, flexShrink: 1 }} size={'h2'}>Review for {repository} by {owner}</Text>
            </View>

            <NewReviewForm onSubmit={handleSubmit} error={error} />
        </>
    )
}

const initialValues = {
    rating: '',
    review: ''
}
const validationSchema = yup.object().shape({
    rating: yup.number().min(0, 'The minimun rating is 0').max(100, 'The maximum rating is 100').required('Provide a rating between 0 and 100'),
    review: yup.string()
})

const NewReviewForm = ({ onSubmit, error }) => {
    const styles = StyleSheet.create({
        input: {
            paddingVertical: theme.units.sm,
            paddingHorizontal: theme.units.md,
            borderRadius: theme.units.xs,
            borderWidth: 1,
            borderColor: theme.color.secondary
        },
        inputError: {
            borderColor: theme.color.error
        },
        buttonPrimary: {
            paddingVertical: theme.units.md,
            backgroundColor: theme.color.primary,
            borderColor: theme.color.primary,
        },
        card: {
            padding: theme.units.xl,
            borderRadius: theme.units.md,
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
            <View style={styles.card}>
                <TextInput
                    inputMode='numeric'
                    placeholder='Rating between 0 and 100'
                    returnKeyType='next'
                    keyboardType='numeric'
                    value={formik.values.rating}
                    onChangeText={formik.handleChange('rating')}
                    onBlur={formik.handleBlur('rating')}
                    style={[
                        styles.input,
                        formik.touched.rating && formik.errors.rating && styles.inputError
                    ]}
                />
                {formik.touched.rating && formik.errors.rating &&
                    <Text color={'error'}>{formik.errors.rating}</Text>}
                <TextInput
                    multiline={true}
                    inputMode='text'
                    placeholder='Write a review'
                    returnKeyType='default'
                    keyboardType='web-search'
                    value={formik.values.review}
                    onChangeText={formik.handleChange('review')}
                    onBlur={formik.handleBlur('review')}
                    // numberOfLines={3}
                    style={[
                        styles.input,
                        { minHeight: 100 },
                        formik.touched.review && formik.errors.review && styles.inputError
                    ]}
                />
                {formik.touched.review && formik.errors.review &&
                    <Text color={'error'}>{formik.errors.review}</Text>}

                <Pressable style={[styles.input, styles.buttonPrimary]} onPress={formik.handleSubmit}><Text color={'white'} size={'button'} style={{ textAlign: 'center' }}>Submit</Text></Pressable>
                {error && <Text color={'error'} style={{ textAlign: 'center' }}>{error}</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}