import React from 'react';
import {View, StyleSheet, ImageBackground, Animated, Image, Text, TouchableOpacity} from 'react-native';
import {
    useFonts,
    Montserrat_500Medium,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import AppLoading from "expo-app-loading";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import {useNavigation} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";

const Welcome = () => {
    const navigation = useNavigation();

    const handleNewAccount = () => {
        navigation.navigate(NavigationNames.Signup)
    }

    return (
        <ImageBackground
            source={require("../../assets/bg.png")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Image source={require('../../assets/welcome.png')} style={styles.welcomeImage} />
                <View style={styles.bottomView}>
                    <Text style={[styles.title]}>Welcome to {'\n'}
                        Charis</Text>
                    <Text style={styles.description}>
                        At Charis, we are dedicated to helping you achieve your
                        financial goals. Whether it's saving, investing, or planning
                        for the future, our innovative solutions and expert
                        guidance are here to support you every step of the way.
                    </Text>
                    <PrimaryButton text='Open An Account' mb={10} onPress={handleNewAccount} />
                    <SecondaryButton text='Already have an account? Sign In'
                                     mb={10}
                                     textSize={16}/>
                    <SecondaryButton text='Subpolitan User? Sign In Here' />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        paddingTop: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeImage: {
        width: '100%',
        flex: 0.45,
        resizeMode: 'stretch',
    },
    bottomView:{
        flex: 0.55,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 44,
    },
    title: {
        fontSize: 32,
        fontWeight: 700,
        // fontFamily: 'Montserrat, Inter',
        textAlign: 'center',
        marginBottom: 13,
    },
    description: {
        fontSize: 12,
        fontWeight: 500,
        // fontFamily: 'Montserrat Inter',
        textAlign: 'center',
        marginBottom: 13,
        color: '#8189B0',
    },
});

export default Welcome;
