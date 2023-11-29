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
import Heading from "../../components/text/Heading";
import {colors} from "../../assets/colors";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {useNavigation, useRoute} from "@react-navigation/native";
import NavigationNames from "../../navigation/NavigationNames";
import DropDownPicker from "react-native-dropdown-picker";
import COUNTRY_STATES_CITY from '../../assets/data/countries-states-cities.json'
import {editProfile} from "../../services/auth/authService";

// limit to Nigeria for now
const NIGERIA_DATA =  COUNTRY_STATES_CITY.find(el => el.name === 'Nigeria')
const NIGERIA_STATES = NIGERIA_DATA?.states

console.log("Cities: ", NIGERIA_STATES[0].cities)

const Address = () => {
    const navigation = useNavigation()

    const [addressState, setAddressState] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [streetName, setStreetName] = useState('')
    const [username, setUsername] = useState('')
    const [showStatePicker, setShowStatePicker] = useState(false)
    const [showCityPicker, setShowCityPicker] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(true)
    const [isStateFocused, setIsStateFocused] = useState(false)
    const [isCityFocused, setIsCityFocused] = useState(false)
    const [isHouseNumberFocused, setIsHouseNumberFocused] = useState(false)
    const [isStreetNameFocused, setIsStreetNameFocused] = useState(false)

    const route = useRoute();

    const {id, user, email, phone } = route?.params ?? {};

    const getCitiesInState = (stateCode) => {
        const selectedState = NIGERIA_STATES?.find(el =>el?.state_code === stateCode);
        setCities(selectedState?.cities)
    }

    const handleNextClicked = async () => {
        // navigation.navigate(NavigationNames.TakeASelfie)

        // uncomment this code to apply the actual logic
        const address = houseNumber + " " + streetName

        let result = await editProfile(email, {username, address, state: addressState, city})

        console.log({result})

        if (result?.status === "success"){
            navigation.navigate(NavigationNames.TakeASelfie, {phone})
        }
    }


    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView} enabled>
                <Heading text='Tell Us a Bit About Yourself' mb={13} size={24} />
                <Text style={[styles.ifCorrectText,{fontSize: 14}]}>
                    You can send and receive money within the Charis community with your unique Charis Username
                </Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput value={username}
                               onChangeText={text => setUsername(text)}
                               placeholder='@johndoe'
                               placeholderTextColor={colors.BLACK_2}
                               autoFocus
                               onFocus={() => setIsUsernameFocused(true)}
                               onBlur={() => setIsUsernameFocused(false)}
                               style={[styles.textInput, {borderColor: isUsernameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                    />
                </View>
                <Heading text='What’s Your House Address?' mt={40} mb={7} size={20} />
                <Text style={[styles.ifCorrectText, {fontSize: 14}]}>
                    Please use your actual house address
                </Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>State</Text>
                    <DropDownPicker
                        schema={{
                            label: 'name', // required
                            value: 'state_code', // required
                            icon: 'icon',
                            parent: 'parent',
                            selectable: 'selectable',
                            disabled: 'disabled',
                        }}
                        listMode="MODAL"
                        placeholder="Select a state"
                        searchable={true}
                        placeholderStyle={{ color: colors.BLACK_2 }}
                        labelStyle={{ color: 'black' }}
                        modalTitle={'States'}
                        open={showStatePicker}
                        value={addressState}
                        mode={'BADGE'}
                        theme={'DARK'}
                        items={NIGERIA_STATES}
                        setOpen={() => {
                            setShowStatePicker(true);
                        }}
                        onClose={() => {
                            setIsStateFocused(false)
                            setShowStatePicker(false);
                        }}
                        onPress={() => setIsStateFocused(true)}
                        // @ts-ignore
                        setValue={async (val: Function) => {
                            const cc = val();
                            getCitiesInState(cc);
                            setAddressState(cc);
                        }}
                        style={[styles.textInput, { backgroundColor: 'transparent', borderColor: isStateFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED }]}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>City</Text>
                    <DropDownPicker
                        schema={{
                            label: 'name', // required
                            value: 'name', // required
                            icon: 'icon',
                            parent: 'parent',
                            selectable: 'selectable',
                            disabled: 'disabled',
                        }}
                        listMode="MODAL"
                        placeholder="Select a city"
                        searchable={true}
                        placeholderStyle={{ color: colors.BLACK_2 }}
                        labelStyle={{ color: 'black' }}
                        modalTitle={'City'}
                        open={showCityPicker}
                        value={city}
                        mode={'BADGE'}
                        theme={'DARK'}
                        items={cities}
                        setOpen={() => {
                            setShowCityPicker(true);
                        }}
                        onClose={() => {
                            setIsCityFocused(false)
                            setShowCityPicker(false);
                        }}
                        onPress={() => setIsCityFocused(true)}
                        // @ts-ignore
                        setValue={async (val: Function) => {
                            const cc = val();
                            // const selected = cities?.find(el => el.id === cc)
                            setCity(cc);
                        }}
                        style={[styles.textInput, { backgroundColor: 'transparent', borderColor: isCityFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED }]}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>House Number</Text>
                    <TextInput value={houseNumber}
                               onChangeText={text => setHouseNumber(text)}
                               placeholder='Your house number'
                               placeholderTextColor={colors.BLACK_2}
                               onFocus={() => setIsHouseNumberFocused(true)}
                               onBlur={() => setIsHouseNumberFocused(false)}
                               style={[styles.textInput, {borderColor: isHouseNumberFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Street Name</Text>
                    <TextInput value={streetName}
                               onChangeText={text => setStreetName(text)}
                               placeholder='Your street name'
                               placeholderTextColor={colors.BLACK_2}
                               onFocus={() => setIsStreetNameFocused(true)}
                               onBlur={() => setIsStreetNameFocused(false)}
                               style={[styles.textInput, {borderColor: isStreetNameFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                    />
                </View>
                <PrimaryButton text="Next" onPress={handleNextClicked} mt={37} mb={50} />
            </KeyboardAvoidingView>
            <View style={{height: 300}}></View>
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
        marginBottom: 13,
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
    dropdownContainer: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        zIndex: 5000,
        borderWidth: 0,
        borderColor: 'transparent',
        color: 'black'
    },
})

export default Address;