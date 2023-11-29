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
import * as ImagePicker from 'expo-image-picker';

// console.log({useKeyboard})

const SelfieTaken = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    // const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    // const [image, setImage] = useState(null);

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation();
    const route = useRoute();
    const otpInput = useRef(null);
    const dispatch = useDispatch();

    // const { status } = useSelector(state => state.user)
    // const status = ""
    const {username, id, token} = useSelector(state => state.auth);
    const {image, phone} = route?.params;
    console.log("Params: ", route?.params)

    // const [status, requestPermission] = ImagePicker.useCameraPermissions();

    // console.log({username})

    const handleNext = async () => {
        navigation.navigate(NavigationNames.VerifyingDetails,{phone})
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Heading text='Take A Selfie' mb={23} size={24} />
            <Text style={styles.subText}>
                We will use this selfie as your profile picture
            </Text>
            <TouchableOpacity style={styles.profileImgContainer}>
                {image? <Image source={{ uri: image }} style={[styles.profileImg,{width}]} />:
                    <Image source={require('../../assets/dummyImg.png')} style={styles.profileImg} />}
            </TouchableOpacity>
             <PrimaryButton text="Continue" mt={40} mb={20} onPress={handleNext} />
        </ScrollView>
    );
};

export default SelfieTaken;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 44,
    },
    profileImg: {
        height: 350,
        resizeMode: 'contain'
    },
    profileImgContainer: {
        marginBottom: 23,
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
    descriptionText: {
        fontSize: 14,
        color: colors.LIGHT_GRAY_1,
    },
})
