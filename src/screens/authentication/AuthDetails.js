import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Heading from "../../components/text/Heading";
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {useNavigation} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import {createCustomerAccountNumber, newUser} from "../../services/auth/authService";

const AuthDetails = () => {
    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmailAddress] = useState('')
    const [referralCode, setReferralCode] = useState('')
    const [isUsernameFocused, setIsUsernameFocused] = useState(true)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isReferralCodeFocused, setIsReferralCodeFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLoginClicked = () => {

    }

    const handleNextClicked = async () => {
        // navigation.navigate(NavigationNames.PhoneSignup)

        // uncomment this code to apply the actual logic
        setLoading(true)
        let names = username?.trim().split(" ")
        console.log({names})
        let firstName = names[0]
        let lastName = names[names?.length - 1]
        let middleName = ""
        if (names?.length > 2) middleName = names[1]
        let result= await newUser(firstName,lastName,email,password)
        const response2 = await createCustomerAccountNumber(email, firstName, firstName, lastName, "", "22198507235")

        console.log({response2})
        // console.log({result})
        // if (result?.loginToken){
        //     navigation.navigate(NavigationNames.PhoneSignup,{id: result?._id, user: result, email: result?.email})
        // }

        setLoading(false)

    }


    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView} enabled>
            <Heading text='Sign Up' mb={5} />
            <Text style={styles.ifCorrectText}>Create an account to get started</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput value={username}
                           onChangeText={text => setUsername(text)}
                    // placeholder='Enter your BVN'
                           placeholderTextColor={colors.BLACK_2}
                           autoFocus
                           onFocus={() => setIsUsernameFocused(true)}
                           onBlur={() => setIsUsernameFocused(false)}
                           style={[styles.textInput, {borderColor: isUsernameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput value={email}
                           onChangeText={text => setEmailAddress(text)}
                           placeholderTextColor={colors.BLACK_2}
                           onFocus={() => setIsEmailFocused(true)}
                           onBlur={() => setIsEmailFocused(false)}
                           style={[styles.textInput, {borderColor: isEmailFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
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
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TouchableOpacity style={[styles.textInput,
                    {flexDirection: 'row', alignItems: 'center', justifyContents: 'space-between',
                        borderColor: isConfirmPasswordFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}>
                    <TextInput value={confirmPassword} secureTextEntry={!showConfirmPassword}
                               onChangeText={text => setConfirmPassword(text)}
                               placeholderTextColor={colors.BLACK_2}
                               onFocus={() => setIsConfirmPasswordFocused(true)}
                               onBlur={() => setIsConfirmPasswordFocused(false)}
                               style={{height: '100%', flex: 0.95}}
                        // style={[styles.textInput, {borderColor: isReferralCodeFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                    />
                    <TouchableOpacity onPress={() => {
                        setShowConfirmPassword(!showConfirmPassword)
                        setIsConfirmPasswordFocused(!isConfirmPasswordFocused)
                    }}>
                        <MaterialCommunityIcon name="eye-off-outline" size={25} direction="ltr"
                                               color={isPasswordFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}
                                               allowFontScaling/>
                    </TouchableOpacity>
                </TouchableOpacity>

            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Referral Code</Text>
                <TextInput value={referralCode}
                           onChangeText={text => setReferralCode(text)}
                           placeholderTextColor={colors.BLACK_2}
                           onFocus={() => setIsReferralCodeFocused(true)}
                           onBlur={() => setIsReferralCodeFocused(false)}
                           style={[styles.textInput, {borderColor: isReferralCodeFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <PrimaryButton text="Next" onPress={handleNextClicked} mb={180} mt={35} loading={loading} />
            </KeyboardAvoidingView>
            <View style={{height: 200}}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 44,
    },
    keyboardView: {
        flex: 1,
    },
    ifCorrectText: {
        fontSize: 16,
        color: colors.LIGHT_GRAY_1,
        marginBottom: 19,
        textAlign: 'center',
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
    inputGroup: {
        marginTop: 16,
    },
    forgotBVNText: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 47,
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
})

export default AuthDetails;