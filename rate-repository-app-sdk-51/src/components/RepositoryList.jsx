import { FlatList, Pressable, StyleSheet, View } from "react-native"
import { useRepositories } from "../hooks/useRepositories"
import { RepositoryListItem } from "./RepositoryListItem"
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { theme } from "../../theme";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

const styles = StyleSheet.create({
    separator: {
        height: theme.units.sm
    },
    list: {
        width: '100%',
    }

})

export const SORTING_OPTIONS = {
    LATEST: 'Latest repositories',
    HIGHEST_RANKED: 'Highest rated repositories',
    LOWEST_RANKED: 'Lowest rated repositories'
}
export const SortingContext = createContext()

const filteringReducer = (state, action) => {
    switch (action.type) {
        case 'search':
            return {
                ...state,
                search: action.search,
            }
        case 'order:latest':
            return {
                ...state,
                sorting: SORTING_OPTIONS.LATEST
            }
        case 'order:highest':
            return {
                ...state,
                sorting: SORTING_OPTIONS.HIGHEST_RANKED
            }
        case 'order:lowest':
            return {
                ...state,
                sorting: SORTING_OPTIONS.LOWEST_RANKED
            }
    }
}

const ItemSeparator = () => <View style={styles.separator} />


export const RepositoryList = () => {

    const [state, dispatch] = useReducer(filteringReducer, { search: '', sorting: SORTING_OPTIONS.LATEST })
    const { repositories, loading } = useRepositories(state.sorting)
    console.log(repositories)

    const filteredRepositories = state.search !== '' ? repositories.filter(r => r.fullName.toLowerCase().includes(state.search.toLowerCase()) || r.description?.toLowerCase().includes(state.search.toLowerCase())) : repositories

    return (
        loading ?
            <Text style={{ textAlign: 'center', verticalAlign: 'middle', margin: 'auto' }}>Loading...</Text>
            :

            <SortingContext.Provider value={{ state, dispatch }}>
                <PaperProvider >
                    <RepositoryContainer repositories={filteredRepositories} />
                </PaperProvider >
            </SortingContext.Provider>
    )


}

export const RepositoryContainer = ({ repositories }) => {


    return (
        <>

            <FlatList
                style={styles.list}
                data={repositories}
                renderItem={(item) => <RepositoryListItem item={item.item} />}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={<ListHeader />}
            />
        </>

    )
}

const CustomPicker = () => {
    const [visible, setVisible] = useState(false);

    const { state, dispatch } = useContext(SortingContext)

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (

        <View style={{ alignItems: 'flex-end', flexGrow: 1, flexBasis: 300, flexShrink: 1 }}>
            <View
                style={{
                    minWidth: 'auto',
                    width: '100%',
                    flexGrow: 1,
                }}>
                <Menu
                    style={{ top: 48 }}
                    anchorPosition="bottom"
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Select selectedOption={state.sorting} onPress={openMenu} />}>
                    <View style={{ flexGrow: 1, width: '100%' }}>
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { dispatch({ type: 'order:latest' }) }} title={SORTING_OPTIONS.LATEST} leadingIcon="clock-time-two-outline" />
                        <Divider />
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { dispatch({ type: 'order:highest' }) }} title={SORTING_OPTIONS.HIGHEST_RANKED} leadingIcon="trending-up" />
                        <Divider />
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { dispatch({ type: 'order:lowest' }) }} title={SORTING_OPTIONS.LOWEST_RANKED} leadingIcon="trending-down" />

                    </View>

                </Menu>
            </View>
        </View>

    )
}

const Select = ({ onPress, selectedOption }) => {

    const styles = StyleSheet.create({
        selectInput: {
            paddingVertical: theme.units.sm,
            paddingHorizontal: theme.units.md,
            borderRadius: theme.units.xs,
            borderWidth: 1,
            borderColor: theme.color.secondary,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            flexBasis: 1,
        },
    })
    return (
        <View style={{
            flexDirection: 'row',
            gap: theme.units.md,
            alignItems: 'center'
        }}>
            <Text size={'button'}>Order by:</Text>
            <Pressable style={styles.selectInput} onPress={onPress}>
                <Text style={{ flexGrow: 1 }}>{selectedOption}</Text>
                <AntDesign name="caretdown" size={theme.units.md} color={theme.color.primary} />
            </Pressable>

        </View>

    )
}

const ListHeader = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: theme.units.md, marginBottom: theme.units.xl, marginTop: theme.units.md }}>
            <CustomSearchBar />
            <CustomPicker />
        </View>
    )
}

const CustomSearchBar = () => {

    const { state, dispatch } = useContext(SortingContext)

    const handleChange = (text) => {
        dispatch({ type: 'search', search: text })
    }
    return (
        <View style={{ flexGrow: 1, flexBasis: 300, flexShrink: 1 }}>
            <TextInput
                value={state.search}
                placeholder={'Search a repository...'}
                onChangeText={handleChange}
            />
        </View>
    )
}
