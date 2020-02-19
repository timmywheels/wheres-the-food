import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {renderStarRating} from "../utils/helpers";
import {Image} from 'react-native-elements';

const BusinessCard = ({businessName, imgUrl, rating, reviewCount, displayAddress}) => {
    return (
        <View style={styles.outerContainerViewStyle}>
            <View style={styles.containerViewStyle}>
                <View style={styles.imageViewStyle}>
                    <Image
                        PlaceholderContent={<ActivityIndicator style={styles.activityIndicator}/>}
                        style={styles.imageStyle}
                        source={{uri: imgUrl}}/>
                </View>
                <View style={styles.infoViewStyle}>
                    <Text numberOfLines={1} style={styles.businessNameStyle}>{businessName}</Text>
                    <Text>{displayAddress[0]}</Text>
                    <Text>{displayAddress[1]}</Text>
                    <View style={styles.infoSubViewStyle}>
                        <Text style={styles.ratingStyle}>
                            {renderStarRating(rating)}
                        </Text>
                        <Text style={styles.reviewCountStyle}>{reviewCount} reviews</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    outerContainerViewStyle: {
        shadowColor: '#333',
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    containerViewStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        minWidth: 300,
        margin: 10,
        overflow: 'hidden'
    },
    activityIndicator: {
        borderRadius: 10
    },
    imageViewStyle: {
        marginRight: 10,

    },
    imageStyle: {
        minHeight: 135,
        minWidth: 135,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    infoViewStyle: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    businessNameStyle: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600'
    },
    infoSubViewStyle: {
        marginTop: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    ratingStyle: {
        color: '#aaaaaa'
    },
    reviewCountStyle: {
        color: '#aaaaaa'
    }
});


export default BusinessCard;
