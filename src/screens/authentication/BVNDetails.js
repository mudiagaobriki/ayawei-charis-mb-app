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
import {useNavigation} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";

const BVNDetails = () => {
    const navigation = useNavigation()

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(true)
    const [isMiddleNameFocused, setIsMiddleNameFocused] = useState(false)
    const [isLastNameFocused, setIsLastNameFocused] = useState(false)
    const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false)
    const [isDateOfBirthFocused, setIsDateOfBirthFocused] = useState(false)

    const handleLoginClicked = () => {

    }

    const handleNextClicked = () => {
        navigation.navigate(NavigationNames.AuthDetails)
    }

    const openDOBModal = () => {
        setShowDatePicker(true)
        setIsDateOfBirthFocused(!isDateOfBirthFocused)

    }

    const handleDateSelected = (event, selectedDate) => {
        setShowDatePicker(false)
        setDateOfBirth(selectedDate)
        setIsDateOfBirthFocused(false)
    }

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>
            <Heading text='BVN Details' mb={5} />
            <Text style={styles.ifCorrectText}>Confirm if it’s correct</Text>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput value={firstName}
                           onChangeText={text => setFirstName(text)}
                    // placeholder='Enter your BVN'
                           placeholderTextColor={colors.BLACK_2}
                           autoFocus
                           onFocus={() => setIsFirstNameFocused(true)}
                           onBlur={() => setIsFirstNameFocused(false)}
                           style={[styles.textInput, {borderColor: isFirstNameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Middle Name</Text>
                <TextInput value={middleName}
                           onChangeText={text => setMiddleName(text)}
                           placeholderTextColor={colors.BLACK_2}
                           onFocus={() => setIsMiddleNameFocused(true)}
                           onBlur={() => setIsMiddleNameFocused(false)}
                           style={[styles.textInput, {borderColor: isMiddleNameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput value={lastName}
                           onChangeText={text => setLastName(text)}
                           placeholderTextColor={colors.BLACK_2}
                           onFocus={() => setIsLastNameFocused(true)}
                           onBlur={() => setIsLastNameFocused(false)}
                           style={[styles.textInput, {borderColor: isLastNameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput value={phoneNumber} keyboardType="phone-pad"
                           onChangeText={text => setPhoneNumber(text)}
                           placeholderTextColor={colors.BLACK_2}
                           onFocus={() => setIsPhoneNumberFocused(true)}
                           onBlur={() => setIsPhoneNumberFocused(false)}
                           style={[styles.textInput, {borderColor: isPhoneNumberFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <TouchableOpacity onPress={openDOBModal}
                    style={[styles.textInput,
                        {justifyContent: 'center',
                        borderColor: isDateOfBirthFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}>
                    <Text>
                        {dateOfBirth.toDateString()}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateOfBirth}
                        mode='date'
                        // is24Hour={true}
                        onChange={handleDateSelected}
                    />
                )}
            </View>
            <PrimaryButton text="Next" onPress={handleNextClicked} mb={18} mt={35} />
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default BVNDetails;