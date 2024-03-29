import React, {useEffect, useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, TouchableOpacity } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
// import { requestOTP, verifyOTP } from '../../utils/users'
import { useNavigation, useRoute } from '@react-navigation/native';
// import NavigationNames from '../../navigation/NavigationNames';
import { useSelector, useDispatch } from 'react-redux';
import NavigationNames from "../../navigation/NavigationNames";
import {verifyOTP} from "../../services/profile/profileService";
import {setSignIn} from "../../redux/features/auth/authSlice";
import {getProfile} from "../../services/auth/authService";
import {updateProfileData, updateProfileStatus} from "../../redux/features/user/userSlice";
import {colors} from "../../assets/colors";
import Heading from "../../components/text/Heading";
import PrimaryButton from "../../components/buttons/PrimaryButton";
// import { setSignIn } from '../../redux/slices/authSlice';
// import { storeData } from '../../utils/deviceStorage';

// console.log({useKeyboard})

const ProfileCreated = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    // const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation();
    const route = useRoute();
    const otpInput = useRef(null);
    const dispatch = useDispatch();

    // const { status } = useSelector(state => state.user)
    const status = ""
    // const {username, id, token} = useSelector(state => state.auth);
    //
    // console.log({username})

    const {phone} = route?.params;

    const handleNext = async () => {
        navigation.navigate(NavigationNames.WelcomeToCharis,{phone})
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Image source={require('../../assets/thumbs-up.png')} style={styles.icon} />
            <Heading text='Profile Created!' mt={90} mb={8} size={32} />
            <Text style={styles.subText}>
                You created a basic profile successfully. Press continue to start using app.
            </Text>
             <PrimaryButton text="Continue" mt={50} mb={40} onPress={handleNext} />
            <Text style={styles.bottomText}>
                By clicking Continue, you agree with the
                <Text style={styles.tc}>Terms and Conditions</Text> and
                the <Text style={styles.tc}>Privacy Policy</Text>.
            </Text>
        </ScrollView>
    );
};

export default ProfileCreated;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 44,
    },
    icon: {
        width: 200,
        height: 200,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    subText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 40,
        textAlign: 'center',
    },
    didntReceiveText: {
        fontSize: 15,
        color: colors.BLACK_2,
        marginTop: 50.5,
        marginBottom: 18,
        textAlign: 'center',
    },
    resendCode: {
        textDecorationLine: 'underline',
        color: colors.PRIMARY_2,
        fontSize: 15,
        fontWeight: 700,
    },
    controlContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    controlInput: {
        height: 55,
        width: 40,
        backgroundColor: '#f0f0ef',
        borderColor: '#e0e0e0',
        borderRadius: 10,
        color: 'black',
        borderWidth: 1,
    },
    bottomText: {
        fontSize: 12,
        color: colors.LIGHT_GRAY_1,
        textAlign: 'center'
    },
    tc: {
        color: colors.PRIMARY_2
    },
})
