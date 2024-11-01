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
        gap: theme.units.md,
        paddingHorizontal: theme.units.md,
        paddingBottom: theme.units.md,
        backgroundColor: theme.color.primary,
        color: theme.textColor.white,
    },
});

export const AppBar = ({ children }) => {

    const { loggedUser, loadingUser } = useLoggedUser()
    const { logOut } = useSignIn()

    console.log('logged user', loggedUser)

    const links = [
        { to: '/', text: 'Repositories', auth: false },
        { to: '/my-reviews', text: 'My Reviews', auth: true },

    ]

    return (
        !loadingUser &&
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: theme.units.lg }}>
                <Text size={'h1'} color={'white'} >Github Repos 🚀⚛️</Text>
                {loggedUser && <Text color={'white'}>{loggedUser?.username}</Text>}
            </View>
            <View style={{ flexDirection: 'row', gap: theme.units.md }}>
                <ScrollView horizontal >
                    {links.map((link, index) => (!link.auth || link.auth && loggedUser) && <Link key={index} to={link.to} style={{ marginRight: theme.units.md }}><Chip color={'primary'}>{link.text}</Chip></Link>)}
                </ScrollView>
                <View style={{ flexDirection: 'row', gap: theme.units.md }}>
                    {!loggedUser && <Link to='/register' style={{ marginLeft: theme.units.md }}><Chip color={'primary'}>Register</Chip></Link>}
                    {loggedUser ?
                        <Pressable onPress={() => logOut()}><Chip color={'primary'}>Log out</Chip></Pressable>
                        :
                        <Link to={'/sign-in'}><Chip color={'primary'}>SignIn</Chip></Link>
                    }

                </View>
            </View>
        </View >
    )
};
