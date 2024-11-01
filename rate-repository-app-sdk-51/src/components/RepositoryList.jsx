import { FlatList, Pressable, StyleSheet, View } from "react-native"
import { useRepositories } from "../hooks/useRepositories"
import { RepositoryListItem } from "./RepositoryListItem"
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { createContext, useContext, useEffect, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { theme } from "../../theme";
import { Text } from "./Text";

const styles = StyleSheet.create({
    separator: {
        height: 8
    },
    list: {
        width: '100%',
        // marginTop: theme.units.md
    }

})

export const SORTING_OPTIONS = {
    LATEST: 'Latest repositories',
    HIGHEST_RANKED: 'Highest rated repositories',
    LOWEST_RANKED: 'Lowest rated repositories'
}
const SortingContext = createContext()


const ItemSeparator = () => <View style={styles.separator} />


export const RepositoryList = () => {

    const [sorting, setSorting] = useState(SORTING_OPTIONS.LATEST)
    const { repositories, loading } = useRepositories(sorting)

    return (
        loading ?
            <Text style={{ textAlign: 'center', verticalAlign: 'middle', margin: 'auto' }}>Loading...</Text>
            :
            <SortingContext.Provider value={{ sorting, setSorting }}>
                <PaperProvider >
                    <RepositoryContainer repositories={repositories} />
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
                ListHeaderComponent={<CustomPicker />}
            />
        </>

    )
}

const CustomPicker = () => {
    const [visible, setVisible] = useState(false);

    const { sorting, setSorting } = useContext(SortingContext)

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (

        <View style={{ alignItems: 'flex-end', marginVertical: theme.units.md, }}>
            <View
                style={{
                    minWidth: 'auto',
                    maxWidth: 400,
                    width: '100%',
                    flexGrow: 1,
                }}>
                <Menu
                    style={{ top: 48 }}
                    anchorPosition="bottom"
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Select selectedOption={sorting} onPress={openMenu} />}>
                    <View style={{ flexGrow: 1, width: '100%' }}>
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { setSorting(SORTING_OPTIONS.LATEST) }} title={SORTING_OPTIONS.LATEST} leadingIcon="clock-time-two-outline" />
                        <Divider />
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { setSorting(SORTING_OPTIONS.HIGHEST_RANKED) }} title={SORTING_OPTIONS.HIGHEST_RANKED} leadingIcon="trending-up" />
                        <Divider />
                        <Menu.Item style={{ flexGrow: 1 }} onPress={() => { setSorting(SORTING_OPTIONS.LOWEST_RANKED) }} title={SORTING_OPTIONS.LOWEST_RANKED} leadingIcon="trending-down" />

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
            // flexShrink: 1,
            flexBasis: 1,
            // alignSelf: 'flex-end',
            // width: '100%',
            // maxWidth: 300

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

// const CustomPicker = () => {
//     const [selectedLanguage, setSelectedLanguage] = useState('')
//     const pickerRef = useRef();

//     function open() {
//         console.log('opening thing')
//         pickerRef.current.focus();
//     }

//     function close() {
//         pickerRef.current.blur();
//     }
//     useEffect(close, [])

//     return (
//         <>
//             <Pressable onPress={close}><Text>Select</Text></Pressable>
//             <Picker
//                 prompt="Select an option"
//                 ref={pickerRef}
//                 selectedValue={selectedLanguage}
//                 onValueChange={(itemValue, itemIndex) => {
//                     setSelectedLanguage(itemValue)
//                     console.log(itemValue)
//                 }
//                 }>
//                 <Picker.Item label="Java" value="java" />
//                 <Picker.Item label="JavaScript" value="js" />
//             </Picker>
//         </>
//     )
// }