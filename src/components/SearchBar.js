import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


const SearchBar = ({ placeholder, searchTerm, onSearchTermChange, onSearchTermSubmit, iconName, size }) => {
    return (
        <View style={styles.searchContainer}>
            <Feather style={styles.searchIcon} name={iconName} size={size} />
            <TextInput
                value={searchTerm}
                style={styles.searchInput}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder={placeholder}
                onChangeText={(newSearchTerm) => onSearchTermChange(newSearchTerm)}
                onEndEditing={() => onSearchTermSubmit()}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#ddd',
        height: 40,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        marginLeft: 10,
        opacity: 0.5
    },
    searchInput: {
        fontSize: 20,
        marginHorizontal: 5,
        flex: 1
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20
    }
});


export default SearchBar;
