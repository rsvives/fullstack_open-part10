import { View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Chip } from './Chip';
import { Text } from './Text';
import { theme } from '../../theme';
import { Link } from 'react-router-native';
import { useSignIn } from '../hooks/useSignIn';
import { useLoggedUser } from '../hooks/useLoggedUser';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        // alignItems: 'flex-start',
        gap: theme.units.md,
        paddingHorizontal: theme.units.md,
        paddingBottom: theme.units.md,
        backgroundColor: theme.color.primary,
        color: theme.textColor.white,
        paddingTop: theme.units.lg
        // ...
    },
    // ...
});

export const AppBar = ({ children }) => {

    const { loggedUser, loadingUser } = useLoggedUser()
    const { logOut } = useSignIn()

    console.log('logged user', loggedUser)

    return (
        !loadingUser &&
        <View style={styles.container}>
            {/* <Text>{JSON.stringify(loggedUser)}</Text> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size={'h1'} color={'white'} >Github Repos 🚀⚛️</Text>
                {loggedUser && <Text color={'white'}>{loggedUser?.username}</Text>}
            </View>
            <ScrollView horizontal >
                <Link to={'/'} style={{ marginRight: theme.units.md }}><Chip color={'primary'}>Repositories</Chip></Link>
                {loggedUser ?
                    <Pressable onPress={() => logOut()}><Chip color={'primary'}>Log out</Chip></Pressable>
                    :
                    <Link to={'/sign-in'}><Chip color={'primary'}>SignIn</Chip></Link>
                }
            </ScrollView>
        </View>
    )
};
