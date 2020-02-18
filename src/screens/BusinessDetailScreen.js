import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    Image,
    StyleSheet,
    ActivityIndicator,
    Linking,
    TouchableOpacity
} from 'react-native';
import yelp from '../api/yelp';
import {Foundation, Feather} from '@expo/vector-icons';
// import openMap from 'react-native-open-maps';

const BusinessDetailScreen = ({navigation}) => {

    const [businessDetails, setBusinessDetails] = useState(null);

    const id = navigation.getParam('id');

    let isOpen = false;
    let displayAddress = [];

    const fetchBusinessDetails = async () => {
        const response = await yelp.get(`/${id}`);
        setBusinessDetails(response.data);
        isOpen = response.data.hours[0].is_open_now;
        displayAddress = response.data.location.display_address;
    };

    const callNumber = phone => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchBusinessDetails(id).catch(err => err);
    }, []);

    const openMap = (lat, lng, customLabel) => {
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${lat},${lng}`;
        const label = customLabel;
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        return Linking.openURL(url);
    };


    return businessDetails ? (
        <View style={styles.containerViewStyle}>
            <View style={styles.topDetailsViewStyle}>
                <Text style={styles.businessNameStyle}>
                    {businessDetails.name}
                </Text>
                {/*<View*/}
                {/*    style={styles.callButtonViewStyle}>*/}
                {/*    <TouchableOpacity onPress={() => callNumber(businessDetails.phone)}>*/}
                {/*        <View style={styles.innerCallButtonViewStyle}>*/}
                {/*            <Foundation style={styles.callButtonIconStyle} size={15} name={'telephone'}/>*/}
                {/*            <Text style={styles.callButtonStyle}>Call {businessDetails.hours[0].is_open_now ? '(Open)' : '(Closed)'}</Text>*/}
                {/*        </View>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
            </View>
            <Text>{businessDetails.categories[0].title || 'Business'}</Text>
            <Text style={styles.businessAddressStyle}>

                {businessDetails.location.display_address.length > 2 ?
                    `${businessDetails.location.display_address[0]}, ${businessDetails.location.display_address[1]}, ${businessDetails.location.display_address[2]}`
                    : `${businessDetails.location.display_address[0]}, ${businessDetails.location.display_address[1]}`
                }
            </Text>
            <View style={styles.primaryBusinessImageView}>
                <Image style={styles.primaryBusinessImage} source={{uri: businessDetails.image_url}}/>
            </View>
            <View>
                <TouchableOpacity onPress={() => callNumber(businessDetails.phone)}>
                    <View style={styles.actionButtonViewStyle}>
                        {/*<Feather name={'navigation'} size={20}/>*/}
                        <Text style={styles.actionButtonTextStyle}>Call {businessDetails.hours[0].is_open_now ? '(Open Now)' : '(Closed)'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => openMap(businessDetails.coordinates.latitude, businessDetails.coordinates.longitude, businessDetails.name)}>
                    <View style={styles.actionButtonViewStyle}>
                        {/*<Feather name={'navigation'} size={20}/>*/}
                        <Text style={styles.actionButtonTextStyle}>Get Directions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    ) : (
        <View style={styles.activityIndicatorView}>
            <ActivityIndicator/>
        </View>
    )
};

const ELECTRIC_PURPLE = '#8f00ff';
const WHITE = '#fff';
const LIGHT_GREY = '#ddd';
const GREY = '#aaa';
const DARK_GREY = '#333';
const GREEN = '#59aa1c';
const RED = '#ff5244';

const styles = StyleSheet.create({
    activityIndicatorView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: LIGHT_GREY
    },
    containerViewStyle: {
        margin: 10
    },
    topDetailsViewStyle: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10
    },
    businessNameStyle: {
        fontWeight: '700',
        fontSize: 20,
        flex: 1
    },
    openCallButtonViewStyle: {
        borderColor: GREEN,
    },
    closedCallButtonViewStyle: {
        borderColor: RED,
    },
    openCallButtonStyle: {
        color: GREEN,
    },
    closedCallButtonStyle: {
        color: RED,
    },
    callButtonStyle: {
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    openCallButtonIconStyle: {
        color: GREEN,

    },
    closedCallButtonIconStyle: {
        color: RED,

    },
    callButtonIconStyle: {
        marginRight: 5

    },
    innerCallButtonViewStyle: {
        flexDirection: 'row'
    },
    primaryBusinessImageView: {
        shadowColor: DARK_GREY,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowOffset: {
            width: 2,
            height: 2
        },
        marginBottom: 20
    },
    primaryBusinessImage: {
        borderRadius: 10,
        height: 300,
        width: '100%',
    },
    businessAddressStyle: {
        marginBottom: 20
    },
    textStyle: {
        fontSize: 20,
        marginVertical: 20
    },
    actionButtonViewStyle: {
        borderWidth: 1,
        borderColor: LIGHT_GREY,
        shadowColor: GREY,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 50,
        borderRadius: 4,
        marginVertical: 5
    },
    actionButtonTextStyle: {
        fontSize: 14,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: GREY,
        textShadowColor: 'rgba(221,221,221,0.55)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    },
    actionButtonViewStyleInverse: {
        borderWidth: 1,
        borderColor: DARK_GREY,
        shadowColor: DARK_GREY,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: LIGHT_GREY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 50,
        borderRadius: 4,
        marginVertical: 5
    },
    actionButtonTextStyleInverse: {
        fontSize: 14,
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: DARK_GREY
    }
});

export default BusinessDetailScreen;
