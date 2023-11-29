import React, {useEffect, useRef, useState} from 'react';
import {
    Image, StyleSheet, ScrollView, TextInput, Text, View,
    useWindowDimensions, Platform, TouchableOpacity, ActivityIndicator
} from 'react-native';
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

const VerifyingDetails = () => {
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
    const [indicatorShown, setIndicatorShow] = useState(true)

    // const { status } = useSelector(state => state.user)
    const status = ""
    // const {username, id, token} = useSelector(state => state.auth);
    //
    // console.log({username})

    const {phone} = route?.params;

    useEffect(() =>{
        setTimeout(() => setIndicatorShow(false), 3000)
    },[])

    const handleNext = async () => {
        navigation.navigate(NavigationNames.ProfileCreated,{phone})
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <TouchableOpacity style={[styles.busyContainer, {backgroundColor: indicatorShown? "#EEDA29": "green"}]}>
                {indicatorShown && <ActivityIndicator color="white" size={30} />}
            </TouchableOpacity>
            <Heading text='We’re Verifying your Details' mt={40} mb={15} size={20} />
            <Text style={styles.subText}>
                Thanks for sharing your details.
                We’ll let you know as soon as we’re done verifying them.
            </Text>
             <PrimaryButton text="Proceed" mt={50} mb={20} onPress={handleNext} />
        </ScrollView>
    );
};

export default VerifyingDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 44,
    },
    busyContainer: {
        width: 80,
        height: 80,
        backgroundColor: "#EEDA29",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
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
