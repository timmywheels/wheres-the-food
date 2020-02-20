import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "./SearchBar";

const SearchBarSection = ({ searchApi, searchTerm, setSearchTerm, location, setLocation, setInitialPageLoad }) => {
    return (
        <View style={styles.searchViewWrapperStyle}>
            <LinearGradient
                style={ styles.searchViewStyle }
                colors={ ['#00c6ff', '#0072ff'] }
            >
                <SearchBar
                    style={ { marginBottom: 5 } }
                    placeholder={ 'Search' }
                    iconName={ 'search' }
                    size={ 20 }
                    searchTerm={ searchTerm }
                    onSearchTermSubmit={ () => {
                        searchApi(searchTerm, location);
                        setInitialPageLoad(false);
                    } }
                    onSearchTermChange={ (newSearchTerm) => setSearchTerm(newSearchTerm) }
                />
                <SearchBar
                    placeholder={ 'Location' }
                    iconName={ 'navigation' }
                    size={ 20 }
                    searchTerm={ location }
                    onSearchTermSubmit={ () => {
                        setLocation(location);
                        searchApi(searchTerm, location);
                        setInitialPageLoad(false);
                    } }
                    onSearchTermChange={ (newLocation) => setLocation(newLocation) }
                />
            </LinearGradient>
        </View>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20
    },
    searchViewWrapperStyle: {
        borderBottomWidth: 1,
        borderColor: '#3c3bff',
        shadowColor: '#333',
        shadowOpacity: 0.75,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
        marginBottom: 10
    },
    searchViewStyle: {
        paddingTop: 5,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#0072ff',
        // backgroundColor: '#6772e5'
    },
});


export default SearchBarSection;
