import React, {useEffect, useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationNames from "../../navigation/NavigationNames";
import {sendOTP} from "../../services/profile/profileService";
import {useDispatch, useSelector} from "react-redux";
import {
    updateProfileData,
    updateProfileStatus,
    updateSplashShown,
    updateUsername
} from "../../redux/features/user/userSlice";
import {editProfile, editUser, getProfile, sendEmailOTP} from "../../services/auth/authService";
import {setSignIn} from "../../redux/features/auth/authSlice";
// import NavigationNames from '../../navigation/NavigationNames';
// import { addPerson, fetchPerson, requestOTP, verifyOTP, doUserSignUp } from '../../utils/users'
// console.log({firebase})
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Heading from "../../components/text/Heading";

// console.log({useKeyboard})

const PhoneSignup = () => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [isFieldFocused, setIsFieldFocused] = useState(true)

    const navigation = useNavigation()
    const phoneInput = useRef(null);
    const dispatch = useDispatch();
    const route = useRoute();

    const {id, user, email, } = route?.params ?? {};

    const {profileData} = useSelector(state => state.user)
    console.log({profileData})


    useEffect(() => {
        dispatch(updateSplashShown(true))
    },[])

    useEffect(() => {

    })

    const sendUserOTP = () => {
        sendEmailOTP(email)
            .then(res => {
                console.log({res})
                if (res.status === 'success'){
                    navigation.navigate(NavigationNames.EmailOTPConfirmation)
                }

            })
            .catch(err => {
                Alert.alert("Charis", `Error sending OTP to email: ${err?.toString()}`)
            })
    }

    const handleNext = async () => {
        // navigation.navigate(NavigationNames.EmailOTPConfirmation)

        // uncomment this code to apply the actual logic
        setLoading(true)

        let callingCode = phoneInput?.current?.getCallingCode();
		let countryCode = phoneInput?.current?.getCountryCode();

        let formattedValue = value?.indexOf('0') !== 0? value: value.substring(1)

        let fullNumber = "+" + callingCode + formattedValue

        console.log("Full number: ", fullNumber)

        let result = await editUser(id, {phone: fullNumber});

        // let result2 = await editProfile(email, {accountNumber: formattedValue})

        if (result?.status === "success"){
            dispatch(updateProfileData({phoneNumber: fullNumber}))
            sendUserOTP()
        }

        setLoading(false)
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Heading text='Mobile Number' mb={13} />
            <Text style={styles.subText}>
                Please enter your phone number. This
                number would be used to receive
                notifications from Charis App.
            </Text>
             <PhoneInput
                ref={phoneInput}
                autoFocus
                placeholder={'Mobile'}
                keyboardType={'phone-pad'}
                defaultCode="NG"
                layout="first"
                defaultValue={value}
                onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                withDarkTheme
                withShadow
                containerStyle={styles.controlContainer}
                textContainerStyle={styles.textContainer}
                flagButtonStyle={{ paddingLeft: Platform.isPad ? 0 : 15 }}
                textInputStyle={{ color: '#000000', height: 55 }}
                codeTextStyle={{ padding: 0, margin: 0 }}
                renderDropdownImage={<Icon name="chevron-down" size={25} color={'#e0e0e0'} />}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                textInputProps={{ maxLength: 12, selectionColor: '#000000' }}
            />

            <PrimaryButton text='Send Code' mt={97} onPress={handleNext} loading={loading} />

        </ScrollView>
    );
};

export default PhoneSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 44,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    subText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 50,
        textAlign: 'center',
    },
    textInput: {
        // width: "90%",
        color: '#000000',
        borderRadius: 10,
        height: 60,
        backgroundColor:'#e0e0e0',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    controlContainer: {
        backgroundColor: '#f0f0f0',
        height: 50,
        borderRadius: 12,
    },
    textContainer: {
        borderRadius: 15,
        backgroundColor: 'e0e0e0',
        height: 50,
    },
})
