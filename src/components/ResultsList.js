import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {withNavigation} from "react-navigation";
import BusinessCard from "./BusinessCard";

const ResultsList = ({title, results, navigation}) => {
    if (!results.length) {
        return null;
    }
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessList', {results: results, title: title})}>
                <View style={styles.rowTitleViewStyle}>
                    <Text style={styles.mainTextStyle}>{title}</Text>
                    <Text style={styles.subTextStyle}>({results.length})</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={results}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(result) => result.id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('BusinessDetail', {id: item.id})}>
                            <BusinessCard
                                businessName={item.name}
                                displayAddress={item.location.display_address}
                                imgUrl={item.image_url}
                                rating={item.rating}
                                reviewCount={item.review_count}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    rowTitleViewStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainTextStyle: {
        fontSize: 22,
        textAlign: 'left',
        fontWeight: '700',
        marginVertical: 20,
        marginLeft: 20,
        marginRight: 10
    },
    subTextStyle: {
        fontSize: 14,
        color: '#919191',
        fontWeight: '300'
    }
});


export default withNavigation(ResultsList);
