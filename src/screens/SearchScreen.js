import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import SearchBar from "../components/SearchBar";
import useResults from '../hooks/useResults';
import ResultsList from "../components/ResultsList";

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
        <View style={styles.mainViewStyle}>
            <View style={styles.searchViewStyle}>
                <SearchBar
                    style={{marginBottom: 5}}
                    placeholder={'Search'}
                    iconName={'search'}
                    size={20}
                    searchTerm={searchTerm}
                    onSearchTermSubmit={() => {
                        searchApi(searchTerm, location);
                        setInitialPageLoad(false);
                    }}
                    onSearchTermChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
                />
                <SearchBar
                    placeholder={'Location'}
                    iconName={'navigation'}
                    size={20}
                    searchTerm={location}
                    onSearchTermSubmit={() => {
                        setLocation(location);
                        searchApi(searchTerm, location);
                        setInitialPageLoad(false);
                    }}
                    onSearchTermChange={(newLocation) => setLocation(newLocation)}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
                <Text
                    style={styles.resultsCount}>{results.length === 1 ? '1 result found' : `${results.length} results found`}</Text>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                {!initialPageLoad ? <Text style={styles.searchDetailsStyle}>{searchTerm} in {location}</Text> : null}
                <ResultsList results={filterResultsByPrice('$')} title={'Cheap Date'}/>
                <ResultsList results={filterResultsByPrice('$$')} title={'The Usual'}/>
                <ResultsList results={filterResultsByPrice('$$$')} title={'Little Pricey'}/>
                <ResultsList results={filterResultsByPrice('$$$$')} title={'Ball Out'}/>
            </ScrollView>
        </View>
    ) : (
        <View style={styles.activityIndicatorView}>
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
    searchViewStyle: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd'
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
