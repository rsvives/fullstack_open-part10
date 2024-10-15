import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { RepositoryList } from './RepositoryList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        padding: 8
    },
    h1: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 12
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Rate Repository Application</Text>
            <RepositoryList />
        </View>
    );
};

export default Main;