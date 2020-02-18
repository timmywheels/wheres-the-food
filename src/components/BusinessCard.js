import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BusinessCard = ({ businessName, imgUrl, rating, reviewCount, displayAddress }) => {

    const renderStarRating = (rating) => {
        const temp = [];
        if (rating % 1 !== 0) {
            for (let i = 0; i < rating - 1; i++) {
                temp.push(<Ionicons key={i} name={'ios-star'} size={15} />)
            }
            temp.push(<Ionicons key={rating} name={'ios-star-half'} size={15} />)
        } else {
            for (let i = 0; i < rating; i++) {
                temp.push(<Ionicons key={i} name={'ios-star'} size={15} />)
            }
        }
        return temp;
    };

    return (
        <View style={ styles.containerViewStyle }>
            <View style={ styles.imageViewStyle }>
                <Image style={ styles.imageStyle } source={ { uri: imgUrl } }/>
            </View>
            <View style={ styles.infoViewStyle }>
                <Text style={ styles.businessNameStyle }>{ businessName }</Text>
                <Text>{displayAddress[0]}</Text>
                <Text>{displayAddress[1]}</Text>
                <View style={styles.infoSubViewStyle}>
                    <Text style={styles.ratingStyle} >
                        { renderStarRating(rating) }
                    </Text>
                    <Text style={styles.reviewCountStyle}>{ reviewCount } reviews</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    containerViewStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: 300,
        margin: 10,
        shadowColor: '#ddd',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    imageViewStyle: {
        marginRight: 10

    },
    imageStyle: {
        minHeight: 135,
        minWidth: 135,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    infoViewStyle: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    businessNameStyle: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '600',
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
