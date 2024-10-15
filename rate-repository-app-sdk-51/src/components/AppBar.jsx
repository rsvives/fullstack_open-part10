import { View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Chip } from './Chip';
import { Text } from './Text';
import { theme } from '../../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        // alignItems: 'flex-start',
        gap: theme.units.md,
        paddingHorizontal: theme.units.md,
        paddingBottom: theme.units.md,
        backgroundColor: theme.color.primary,
        color: theme.textColor.white

        // ...
    },
    // ...
});

export const AppBar = ({ children }) => {
    return (
        <View style={styles.container}>
            <Text size={'h1'} color={'white'} style={{ marginTop: theme.units.lg }}>Github Repos 🚀⚛️</Text>
            <ScrollView horizontal>
                <Link to={'/'}><Chip color={'primary'}>Repositories</Chip></Link>
                <Link to={'/sign-in'}><Chip color={'primary'}>SignIn</Chip></Link>
            </ScrollView>
        </View>
    )
};
