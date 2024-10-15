import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { RepositoryList } from './RepositoryList';

import { Text } from './Text'
import { theme } from '../../theme';
import { AppBar } from './AppBar';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    },
    main: {
        flexGrow: 1,
        flexShrink: 1,
        paddingHorizontal: theme.units.sm,
        backgroundColor: theme.color.surface
    }
});

const Main = () => {
    return (

        <View style={styles.container}>
            <AppBar />
            <View style={styles.main}>
                <RepositoryList />
            </View>
        </View>
    );
};

export default Main;