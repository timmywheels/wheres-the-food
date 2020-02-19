import React from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import BusinessCard from "../components/BusinessCard";

const BusinessListScreen = ({ navigation }) => {
    const results = navigation.getParam('results');
    const title = navigation.getParam('title');

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={ styles.textStyle }>{title}</Text>
            <FlatList
                data={results}
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
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20
    }
});

export default BusinessListScreen;
