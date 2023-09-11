import React, {useEffect, useRef, useState} from 'react';
import { Image, StyleSheet, ScrollView, TextInput, Text, View,
useWindowDimensions, Platform, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from "../../navigation/NavigationNames";
import {sendOTP} from "../../services/profile/profileService";
import {useDispatch} from "react-redux";
import {
    updateProfileData,
    updateProfileStatus,
    updateSplashShown,
    updateUsername
} from "../../redux/features/user/userSlice";
import {getProfile} from "../../services/auth/authService";
import {setSignIn} from "../../redux/features/auth/authSlice";
// import NavigationNames from '../../navigation/NavigationNames';
// import { addPerson, fetchPerson, requestOTP, verifyOTP, doUserSignUp } from '../../utils/users'
// console.log({firebase})
import {colors} from "../../assets/colors";

// console.log({useKeyboard})

const PhoneSignup = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [loading, setLoading] = useState(false)

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation()
    const phoneInput = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSplashShown(true))
    },[])

    const handleNext = async () => {
        setLoading(true)

        let callingCode = phoneInput?.current?.getCallingCode();
		let countryCode = phoneInput?.current?.getCountryCode();

        let formattedValue = value?.indexOf('0') !== 0? value: value.substring(1)

        let fullNumber = "+" + callingCode + formattedValue

        console.log("Full number: ", fullNumber)
        //
        let response = await sendOTP(fullNumber)
        response = response.data
        //
        console.log("Response data: ", response)

        // alert(response)

        if (response?.loginToken){
            dispatch(updateUsername(fullNumber))

            dispatch(setSignIn({ username: response?.username, id: response?._id, token: response?.loginToken}))

            const profileData = await getProfile(response?._id)

            const status = profileData?.status

            dispatch(updateProfileStatus(''))

            navigation.navigate(NavigationNames.OTPConfirmation, { phoneNumber: fullNumber})
        }

        setLoading(false)
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            {/* <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Phone Number"
                keyboardType='numeric'
             />
             <TextInput
                style={[styles.textInput, {width: width - 80}]}
                placeholder="Password/OTP"
             /> */}
             <Text style={styles.signupText}>Sign Up</Text>
             {/* <TextInput
                onChangeText={text => setEmail(text)}
                placeholder='Email'
                // keyboardType='email'
                style={[styles.textInput,{width:width-80, height: 55, marginBottom: 30, backgroundColor: '#e0e0e0',}]}
              /> */}
             <PhoneInput
                ref={phoneInput}
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
                // autoFocus
                containerStyle={[
                    {
                        // width: dimensions.width - 60,
                        backgroundColor: '#f0f0f0',
                        height: 60,
                        borderRadius: 10,
                    },
                ]}
                textContainerStyle={{
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: 'e0e0e0',
                    height: 60,
                }}
                flagButtonStyle={{ paddingLeft: Platform.isPad ? 0 : 20 }}
                textInputStyle={{ color: '#000000', height: 55 }}
                codeTextStyle={{ padding: 0, margin: 0 }}
                renderDropdownImage={<Icon name="chevron-down" size={25} color={'#e0e0e0'} />}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                textInputProps={{ maxLength: 12, selectionColor: '#000000' }}
            />

            <Button disabled={loading} dark mode="contained" onPress={() => handleNext()}
                buttonColor={colors.PRIMARY} contentStyle={[styles.button,{width: width - 80}]}
                style={{marginTop: 50, borderRadius: 10}} labelStyle={styles.buttonLabel}>
                {loading? "Busy...": 'Next'}
             </Button>

        </ScrollView>
    );
};

export default PhoneSignup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 200,
        height: 120,
        resizeMode: 'stretch',
        marginBottom: 40,
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
    nextButton: {
        backgroundColor: 'black',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 60
    },
    nextText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    button: {
        height: 55,
    },
    buttonLabel: {
        fontSize: 16,
    },
})
