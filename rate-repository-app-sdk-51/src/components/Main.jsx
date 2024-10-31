import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import { RepositoryList } from './RepositoryList';

import { theme } from '../../theme';
import { AppBar } from './AppBar';
import { SignIn } from './SignIn';
import { RepositoryView } from './RepositoryView';
import { ReviewRepositoryView } from './ReviewRepositoryView';
import { RegisterView } from './RegisterView';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    },
    main: {
        flexGrow: 1,
        flexShrink: 1,
        padding: theme.units.sm,
        backgroundColor: theme.color.surface
    }
})



const Main = () => {
    return (

        <View style={styles.container}>
            <AppBar />
            <View style={styles.main}>
                <Routes >
                    <Route path='/' element={<RepositoryList />} />
                    <Route path='/sign-in' element={<SignIn />} />
                    <Route path='/register' element={<RegisterView />} />
                    <Route path="/repositories/:id" element={<RepositoryView />} />
                    <Route path='/review/:owner/:repository' element={<ReviewRepositoryView />} />
                    <Route path='*' element={<Navigate to={'/'} replace />} />
                </Routes>
            </View>
        </View>
    )
}

export default Main;