import React, {useState, useEffect} from 'react';
import {
    ScrollView,
    View,
    Text,
    Platform,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Linking,
    TouchableOpacity
} from 'react-native';
import yelp from '../api/yelp';
import {LinearGradient} from 'expo-linear-gradient';
import {openMap} from "../utils/helpers";


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

    if (!businessDetails) {
        return null;
    }

    return businessDetails ? (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.containerViewStyle}>
                <View style={styles.topDetailsViewStyle}>
                    <Text style={styles.businessNameStyle}>
                        {businessDetails.name}
                    </Text>
                </View>
                <View style={styles.businessCategoryAddressStyle}>
                    <Text>{businessDetails.categories[0].title || 'Business'}</Text>
                    <Text style={styles.businessAddressStyle}>

                        {businessDetails.location.display_address.length > 2 ?
                            `${businessDetails.location.display_address[0]}, ${businessDetails.location.display_address[1]}, ${businessDetails.location.display_address[2]}`
                            : `${businessDetails.location.display_address[0]}, ${businessDetails.location.display_address[1]}`
                        }
                    </Text>
                </View>
                <View>
                    <FlatList

                        data={businessDetails.photos}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={key => key}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.primaryBusinessImageView}>
                                    <Image style={styles.primaryBusinessImage} source={{uri: item}}/>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={styles.buttonContainerView}>
                    <View>
                        <TouchableOpacity onPress={() => callNumber(businessDetails.phone)}>
                            <LinearGradient
                                style={styles.actionButtonViewStyleAlt}
                                locations={[0, 1.0]}
                                colors={['#8f00ff', '#f62681']}
                                start={{x: 0, y: 1}}
                                end={{x: 1, y: 1}}
                            >
                                <Text
                                    style={styles.actionButtonTextStyleAlt}>Call {businessDetails.hours[0].is_open_now ? '(Open Now)' : '(Closed)'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => openMap(businessDetails.coordinates.latitude, businessDetails.coordinates.longitude, businessDetails.name)}>
                            <View style={styles.actionButtonViewStyle}>
                                <Text style={styles.actionButtonTextStyle}>Get Directions</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        ) :
        (
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
        // margin: 10,
        flex: 1
    },
    topDetailsViewStyle: {
        margin: 10,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10
    },
    businessNameStyle: {
        fontWeight: '700',
        fontSize: 20,
        flex: 1
    },
    businessCategoryAddressStyle: {
        margin: 10
    },
    buttonContainerView: {
        margin: 10
    },
    callButtonStyle: {
        textTransform: 'uppercase',
        letterSpacing: 1,
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
        marginBottom: 10
    },
    primaryBusinessImage: {
        borderRadius: 10,
        width: 320,
        height: 220,
        marginHorizontal: 10
    },
    secondaryBusinessImageView: {
        shadowColor: DARK_GREY,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowOffset: {
            width: 2,
            height: 2
        },
        marginVertical: 10
    },
    secondaryBusinessImageStyle: {
        borderRadius: 10,
        height: 150,
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
        borderWidth: 2,
        borderColor: ELECTRIC_PURPLE,
        shadowColor: GREY,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 4,
        marginVertical: 10
    },
    actionButtonTextStyle: {
        fontSize: 14,
        letterSpacing: 3,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: ELECTRIC_PURPLE,
        textAlign: 'center',
        // textShadowColor: 'rgba(221,221,221,0.55)',
        // textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2
    },
    actionButtonViewStyleAlt: {
        // borderWidth: 1,
        // borderColor: WHITE,
        shadowColor: DARK_GREY,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: ELECTRIC_PURPLE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 4,
        marginVertical: 5
    },
    actionButtonTextStyleAlt: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: WHITE
    }
});

export default BusinessDetailScreen;
