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
import CircularProgress from "react-native-circular-progress-indicator";
import ActionItem from "../../components/ActionItem";
// import { setSignIn } from '../../redux/slices/authSlice';
// import { storeData } from '../../utils/deviceStorage';

// console.log({useKeyboard})

const DEMO_STEPS = [
    {
        key: 1,
        leftImgUrl :require("../../assets/actionItem/logo.png"),
        titleText: "Create Your Account",
        subtitleText: "Create a basic Charis account to access our services.",
    },
    {
        key: 2,
        leftImgUrl :require("../../assets/actionItem/edit.png"),
        titleText: "More About You",
        subtitleText: "A few more details about you and how you’ll use Charis",
    },
    {
        key: 3,
        leftImgUrl :require("../../assets/actionItem/lock.png"),
        titleText: "Secure your Account",
        subtitleText: "Create a transaction PIN and set a trusted device.",
    },
]

const GetStarted = () => {
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState(1);
    const [progressValue, setProgressValue] = useState(0);
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
    const {username, id, token} = useSelector(state => state.auth);

    console.log({username})

    useEffect(() => {
        setProgressValue(prevState => value/3 * 100);
    },[])

    const handleNext = async () => {
        navigation.navigate(NavigationNames.WelcomeToCharis)
    }

    const handleArrowClick = () => {

    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Heading text='Get Started' mt={0} mb={21} size={32} />
            <ActionItem titleText="Set up your Charis Profile"
                subtitleText="You created a basic profile successfully. Press continue to start using app."/>
            {
                DEMO_STEPS?.map((item, index) => {
                    return <ActionItem key={index} hasProgress={false} hasRightCaret={false}
                                       leftImgUrl={item?.leftImgUrl}
                                       titleText={item?.titleText}
                                       subtitleText={item?.subtitleText}
                                       listIndex={item?.key}/>
                })
            }
        </ScrollView>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 58,
        paddingHorizontal: 25,
    },
    setupItemsContainer: {
        paddingTop: 22,
        paddingHorizontal: 15,
        justifyContent: 'center',
        width: "100%",
    },
    item: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
    },
    progressContainer: {
        marginRight: 12
    },
    arrowContainer: {
        alignSelf: 'flex-start',
    },
    icon: {
        width: 200,
        height: 200,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    textsContainer: {
        maxWidth:180,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.BLACK_1,
    },
    subText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.LIGHT_GRAY_1,
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
