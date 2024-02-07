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
import uploadToFirebase, {listFiles} from "../../helperFunctions/firebaseFunctions";

// console.log({useKeyboard})

const TakeASelfie = () => {
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState(null);

    const {height, width} = useWindowDimensions()
    const navigation = useNavigation();
    const route = useRoute();

    const {phone } = route?.params ?? {};

    // const {username, id, token} = useSelector(state => state.auth);

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    // console.log({username})

    const handleNext = async () => {
        // await pickImage();
        await openCamera();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        console.log({status})
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
            // const fileName = result.uri.split("/").pop();
            // const uploadResp = await uploadToFirebase(result.uri, fileName, (v) =>
            //     console.log(v)
            // );
            // console.log(uploadResp);
            //
            // listFiles().then((listResp) => {
            //     const files = listResp.map((value) => {
            //         return { name: value.fullPath };
            //     });
            //
            //     setFiles(files);
            // });
            navigation.navigate(NavigationNames.SelfieTaken,{image: result.uri, phone})
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <Heading text='Take A Selfie' mb={23} size={24} />
            <Text style={styles.subText}>
                We will use this selfie as your profile picture
            </Text>
            <TouchableOpacity style={styles.profileImgContainer}>
                {image? <Image source={{ uri: image }} style={styles.profileImg} />:
                    <Image source={require('../../assets/dummyImg.png')} style={styles.profileImg} />}
            </TouchableOpacity>
            <View style={styles.instructionsContainer}>
                <View style={styles.instructionsItem}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.number}>1</Text>
                    </View>
                    <View style>
                        <Heading size={16} text='Good Lighting' style={{textAlign: 'left'}}  />
                        <Text style={styles.descriptionText}>
                            Make sure you are in a well lit area
                            and both ears are uncovered.
                        </Text>
                    </View>
                </View>
                <View style={styles.instructionsItem}>
                    <View style={styles.numberContainer}>
                        <Text style={styles.number}>2</Text>
                    </View>
                    <View style>
                        <Heading size={16} text='Look Straight' style={{textAlign: 'left'}}  />
                        <Text style={styles.descriptionText}>
                            Hold your phone at eye level and
                            look straight to the camera.
                        </Text>
                    </View>
                </View>
            </View>
             <PrimaryButton text="Open Camera" mt={0} mb={20} onPress={handleNext} />
        </ScrollView>
    );
};

export default TakeASelfie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 44,
    },
    profileImg: {
        width: 154,
        height: 154,
        borderRadius: 100,
    },
    profileImgContainer: {
        marginBottom: 23,
    },
    instructionsContainer: {
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    instructionsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    numberContainer: {
        backgroundColor: colors.PRIMARY_2,
        borderRadius: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 19,
    },
    number: {
        color: 'white',
        fontSize: 18,
        fontWeight: 700,
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
