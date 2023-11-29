import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import Heading from "../../components/text/Heading";
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {login} from "../../services/auth/authService";

const Signin = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailFocused, setIsEmailFocused] = useState(true)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {phone} = route?.params ?? {};
    const handleLoginClicked = () => {

    }

    const handleContinueClicked = async () => {
        // navigation.navigate(NavigationNames.CreatePasscode)

        // uncomment this code to apply the actual logic
        const result = await login(email, password)

        console.log({result})

        if (result?.loginToken){
            navigation.navigate(NavigationNames.Dashboard,{user: result})
        }
        else{
            alert("Invalid login credentials");
        }
    }

    return (
        <View style={styles.container}>
            <Heading text='Welcome Back' mb={5} />
            <Text style={styles.openAcctText}>Sign in to continue</Text>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput value={email} keyboardType='email-address'
                       onChangeText={text => setEmail(text)}
                       // placeholder=''
                       placeholderTextColor={colors.BLACK_2}
                       autoFocus
                       onFocus={() => setIsEmailFocused(true)}
                       onBlur={() => setIsEmailFocused(false)}
                       style={[styles.textInput, {borderColor: isEmailFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                       />
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TouchableOpacity style={[styles.textInput,
                    {flexDirection: 'row', alignItems: 'center', justifyContents: 'space-between',
                        borderColor: isPasswordFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}>
                    <TextInput value={password} secureTextEntry={!showPassword}
                               onChangeText={text => setPassword(text)}
                               placeholderTextColor={colors.BLACK_2}
                               onFocus={() => setIsPasswordFocused(true)}
                               onBlur={() => setIsPasswordFocused(false)}
                               style={{height: '100%', flex: 0.95}}
                        // style={[styles.textInput, {borderColor: isReferralCodeFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                    />
                    <TouchableOpacity onPress={() => {
                        setShowPassword(!showPassword)
                        setIsPasswordFocused(!isPasswordFocused)
                    }}>
                        <MaterialCommunityIcon name="eye-off-outline" size={25} direction="ltr"
                                               color={isPasswordFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}
                                               allowFontScaling/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            <Text style={styles.signupText}>Don’t have an account? -
                <Text style={styles.signupText2}> Sign Up</Text>
            </Text>
            <PrimaryButton text="Sign In" onPress={handleContinueClicked} mb={18} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 44,
    },
    openAcctText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 34,
        textAlign: 'center',
    },
    forgotPasswordText: {
        fontSize: 12,
        color: colors.LIGHT_GRAY_1,
        alignSelf: 'flex-end',
        marginTop: 23,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.BLACK_1,
        textAlign: 'left',
        marginBottom: 5,
    },
    textInput: {
        height: 50,
        width: '100%',
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 16,
    },
    signupText: {
        marginTop: 45,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 400,
        marginBottom: 47,
    },
    signupText2: {
        fontWeight: 600,
    },
    haveAccountText: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'center',
    },
    loginText: {
        fontWeight: 600,
        textDecorationLine: 'underline',
    },
    inputGroup: {
        marginTop: 16,
    },
})

export default Signin;