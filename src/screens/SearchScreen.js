import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import useResults from '../hooks/useResults';
import ResultsList from "../components/ResultsList";
import SearchBarSection from "../components/SearchBarSection";

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState("Cocktails");
    const [location, setLocation] = useState("Providence, RI");
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        })
    };

    return results.length ? (
        <View style={ styles.mainViewStyle }>
            <SearchBarSection
                searchApi={ searchApi }
                searchTerm={ searchTerm }
                setSearchTerm={ setSearchTerm }
                location={location}
                setLocation={ setLocation }
                setInitialPageLoad={ setInitialPageLoad }
            />
            <ScrollView showsVerticalScrollIndicator={ false } style={ styles.scrollViewStyle }>
                <Text
                    style={ styles.resultsCount }>{ results.length === 1 ? '1 result found' : `${ results.length } results found` }</Text>
                { errorMessage ? <Text style={ styles.errorMessage }>{ errorMessage }</Text> : null }
                { !initialPageLoad ?
                    <Text style={ styles.searchDetailsStyle }>{ searchTerm } in { location }</Text> : null }
                <ResultsList results={ filterResultsByPrice('$') } title={ 'Cheap Date' }/>
                <ResultsList results={ filterResultsByPrice('$$') } title={ 'The Usual' }/>
                <ResultsList results={ filterResultsByPrice('$$$') } title={ 'Little Pricey' }/>
                <ResultsList results={ filterResultsByPrice('$$$$') } title={ 'Ball Out' }/>
            </ScrollView>
        </View>
    ) : (
        <View style={ styles.activityIndicatorView }>
            <ActivityIndicator/>
        </View>
    )
};

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    },
    activityIndicatorView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#dddddd55'
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
    scrollViewStyle: {
        backgroundColor: '#f1f6f8',
        paddingBottom: 100
    },
    searchDetailsStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20
    },
    resultsCount: {
        textAlign: 'left',
        margin: 10,
        marginHorizontal: 20,
        fontSize: 12,
        color: '#aaa'
    },
    errorMessage: {
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
        color: 'red',
        fontWeight: '500'
    }
});


export default SearchScreen;
