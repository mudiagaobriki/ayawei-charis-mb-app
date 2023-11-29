import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    TextInput,
    useWindowDimensions,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import NavigationNames from "../../navigation/NavigationNames";
import {useDispatch, useSelector} from "react-redux";
import {
    getBankList, getPaymentServices,
    getProfile,
    getUserAccountDetails, getVendorList, initiateBillPayment,
    newProfile,
    TransferMoney,
    VerifyAccount
} from "../../services/auth/authService";
import DropDownPicker from "react-native-dropdown-picker";
import {colors} from "../../assets/colors";
import BalanceCard from "../../components/BalanceCard";
import Heading from "../../components/text/Heading";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import {updateUser} from "../../utils/users";

const BENEFICIARIES = [
    {
        key: 1,
        imgUrl: require("../../assets/beneficiary/img.png"),
        text: "John",
    },
    {
        key: 2,
        imgUrl: require("../../assets/beneficiary/img_1.png"),
        text: "Jane",
    },
    {
        key: 3,
        imgUrl: require("../../assets/beneficiary/img_2.png"),
        text: "Ada",
    },
    {
        key: 4,
        imgUrl: require("../../assets/beneficiary/img_3.png"),
        text: "Akpan",
    },
    {
        key: 5,
        imgUrl: require("../../assets/beneficiary/img_4.png"),
        text: "Ola",
    },
]


const AirtimeDetails = () => {
	const [bank, setBank] = useState('')
	const [bankList, setBankList] = useState([])

	const [resolveStatus, setResolveStatus] = useState(false)
	const [showBankPicker, setShowBankPicker] = useState(false)

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	// const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [balance, setBalance] = useState(0)

    const [userProfile, setUserProfile] = useState(null)
    const [accountDetails, setAccountDetails] = useState(null)
    const [accountNumber, setAccountNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [isAccountNumberFocused, setIsAccountNumberFocused] = useState(false)
    const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false)
    const [isAmountFocused, setIsAmountFocused] = useState(false)
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false)
    const [isBankFocused, setIsBankFocused] = useState(false)
    const [isVendorFocused, setIsVendorFocused] = useState(false)
    const [vendor, setVendor] = useState("")
    const [service, setService] = useState(null)
    const [phone, setPhone] = useState("")
    const [vendorList, setVendorList] = useState([])
    const [showVendorPicker, setShowVendorPicker] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const focused = useIsFocused();

    const {username} = useSelector(state => state.auth);

    const initiatePayment = async (service_id, account_number, vendor_id, amount) => {
        setLoading(true)
        let result = await initiateBillPayment(service_id,account_number,vendor_id,100)
        result = result?.data;

        console.log({result})
        setLoading(false)
    }

	return (
		<ScrollView contentContainerStyle={{paddingTop: 10, paddingHorizontal: 40,}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 70}}>
                 <View style={styles.pageHeader}>
                     <Icon name="chevron-left" size={30} onPress={() => navigation.goBack()} />
                     <Heading text='Confirm' size={24} mb={5} />
                     <View style={{alignSelf: 'center'}}>
                         <PrimaryButton text="Next" width={65} height={28} onPress={() => console.log("Clicked")}/>
                     </View>

                 </View>
                 <View style={{marginTop: 20, alignItems: 'center'}}>
                     <Text style={{fontSize: 14, marginBottom: 5}}>To</Text>
                     <Heading text='08123456789' size={24} mb={11} />
                     <Text style={{fontSize: 14, marginBottom: 5}}>Amount</Text>
                     <Heading text='N2,000' size={24} mb={15} />
                 </View>
                 <View style={styles.tFeeContainer}>
                     <View style={styles.tFeeItem}>
                        <Text style={styles.tFeeText}>From</Text>
                        <Text style={styles.tFeeText}>8138885831</Text>
                     </View>
                     <View style={[styles.tFeeItem, {marginTop: 18}]}>
                         <Text style={styles.tFeeText}>Transaction Fee</Text>
                         <Text style={styles.tFeeText}>N0.00</Text>
                     </View>
                 </View>

			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default AirtimeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 44,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 30,
    },
    pageHeader: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // marginLeft: -30,
        width: "100%",
        marginBottom: 10,
    },
    tFeeContainer: {
        padding: 15,
    },
    tFeeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tFeeText: {
        fontSize: 14,
        fontWeight: 500,
    }
})
