import React from "react";
import { Ionicons } from '@expo/vector-icons';
import {Linking, Platform} from "react-native";

export const renderStarRating = (rating) => {
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

export const openMap = (lat, lng, customLabel) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = customLabel;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    return Linking.openURL(url);
};
