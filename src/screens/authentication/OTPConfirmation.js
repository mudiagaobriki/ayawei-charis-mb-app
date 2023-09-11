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
// import { setSignIn } from '../../redux/slices/authSlice';
// import { storeData } from '../../utils/deviceStorage';

// console.log({useKeyboard})

const OTPConfirmation = () => {
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

    const { phoneNumber } = route?.params;
    // const { status } = useSelector(state => state.user)
    const status = "complete"
    const {username, id, token} = useSelector(state => state.auth);

    console.log({username})

    // const {status} = useSelector(state => state?.user)
    //
    // console.log({status})

    // useEffect(() => {
    //     getProfile(id)
    //         .then(res => {
    //             console.log("User Profile: ", res)
    //         })
    // },[])

    // const username = route?.params?.username;
    // console.log(user)
    // const {username,email} = user;

    const handleNext = async () => {
        setLoading(true)
        console.log('Value : ', value);
        console.log("Phone Number: ", phoneNumber)

        // alert("Username: ", username)
        // alert("Phone Number: ", phoneNumber)
        // const response = await verifyOTP(username, value)

        // console.log({response})
        // if (response?.loginToken){
        //     dispatch(setSignIn({ username: response?.username, id: response?._id, token: response?.loginToken}))
        //
        //     const profileData = await getProfile(response?._id)
        //
        //     const status = profileData?.status

            if (status == undefined || status === ""){
                navigation.navigate(NavigationNames.BasicDetails, { username, id});
            }
            else if (status === "complete"){
                dispatch(updateProfileStatus('complete'))
                // dispatch(updateProfileData(profileData))
                navigation.navigate(NavigationNames.Home)
            }


            // navigation.navigate(NavigationNames.CreatePin, { id: response?._id, token: response?.loginToken })
        // }
        setLoading(false)
        // navigation.navigate(NavigationNames.CreatePin)
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
             <Text style={styles.signupText}>Confirm OTP</Text>

             <OTPTextInput
								ref={otpInput}
								inputCount={6}
								containerStyle={{
									flex: 1,
									justifyContent: 'center',
									width: width - 80,
								}}
								textInputStyle={{
									height: 55,
									width: 40,
									backgroundColor: '#f0f0ef',
									borderColor: '#e0e0e0',
									borderRadius: 10,
									color: 'black',
                                    borderWidth: 1,
								}}
								tintColor={'#e0e0e0'}
								offTintColor={'#e0e0e0'}
								// handleTextChange={text => console.log(text)}
								// value={values.otp}
								handleTextChange = {text=>setValue(text)}
								underlineColor="transparent"
								activeUnderlineColor="transparent"
							/>

             <TouchableOpacity
                 disabled={loading}
                onPress={() => handleNext()}
                style={[styles.nextButton, {width: width-80, backgroundColor: colors.PRIMARY}]}>
                <Text
                onPress={() => handleNext()}
                style={styles.nextText}>{loading? "Verifying...": "Next"}</Text>
             </TouchableOpacity>

        </ScrollView>
    );
};

export default OTPConfirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 200,
        height: 120,
        resizeMode: 'stretch',
        marginBottom: 30,
    },
    textInput: {
        // width: "90%",
        color: '#000000',
        borderRadius: 10,
        height: 60,
        backgroundColor:'#f0f0f0',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    nextButton: {
        backgroundColor: 'black',
        height: 60,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 50,
    },
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50
    },
    nextText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    }
})
