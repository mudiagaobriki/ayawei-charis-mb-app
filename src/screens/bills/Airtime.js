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


const Airtime = () => {
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
    // const {fieldsEnabled, accNo, accName, userBank} = route?.params ?? {fieldsEnabled: true,
    //     accNo: "", accName: "", userBank: ""};

    const BeneficiaryCard = ({image, text}) => {
        return <TouchableOpacity style={styles.beneficiaryItem}>
            <Image source={image} style={styles.beneficiaryImage} />
            <Text style={styles.beneficiaryName}>{text}</Text>
        </TouchableOpacity>
    }

    // useEffect(() => {
    //     console.log("This ran -----------------------------------------------------------")
    //     getProfile(user?.email)
    //         .then(res => {
    //             console.log("User Profile : ", {res})
    //             setUserProfile(res)
    //         })
    //         .catch(err => console.log({err}))
    //     console.log("Na here")
    // },[focused])

	const onSave = async () => {
        // //console.log("Clicked here")
        // //console.log({bank, accountNumber})
        let desc = `from ${username}: ${description}`
        const response = await TransferMoney(bank, accountNumber, accountName, amount, desc)

        // //console.log({response})

    }

    useEffect(() => {
        selectVendor()
    }, [focused]);

    const selectVendor = (id="0001") => {
        getVendorList(id)
            .then(res => {
                // setBillsShown(name)
                // console.log("Vendors: ", res)
                setService(id);
                setVendorList(res)
                console.log("Vendor List: ",{res})
            })

        // servicePriceListEnquiry(id)
        //     .then(resp => {
        //         console.log('Service Price List" ', {resp})
        //     })
    }

    const initiatePayment = async (service_id, account_number, vendor_id, amount) => {
        setLoading(true)
        let result = await initiateBillPayment(service_id,account_number,vendor_id,100)
        result = result?.data;

        console.log({result})
        setLoading(false)
    }

    const handleNext = () => {
        // save to redux
        navigation.navigate(NavigationNames.AirtimeDetails);
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
                     <Heading text='Airtime' size={24} mb={5} />
                     <View style={{alignSelf: 'center'}}>
                         <PrimaryButton text="Next" width={65} height={28} onPress={handleNext}/>
                     </View>

                 </View>
                 <Text style={{fontSize: 14, marginBottom: 28, marginTop: 20}}>Most Recent</Text>
                 <View style={styles.beneficiariesContainer}>
                     {
                         BENEFICIARIES.map((item, index) => {
                             return <BeneficiaryCard key={index} image={item?.imgUrl} text={item?.text} />
                         })
                     }
                 </View>

                 <Text style={styles.inputLabel}>Amount</Text>
                 <TextInput value={amount} keyboardType='numeric'
                            onChangeText={text => setAmount(text)}
                            placeholder='Beneficiary Amount'
                            placeholderTextColor={colors.BLACK_2}
                            autoFocus
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => setIsAmountFocused(false)}
                            style={[styles.textInput, {borderColor: isAmountFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
                 <View style={styles.inputGroup}>
                     <Text style={styles.inputLabel}>Network</Text>
                     <DropDownPicker
                         schema={{
                             label: 'vendor_name', // required
                             value: 'vendor_id', // required
                             icon: 'icon',
                             parent: 'parent',
                             selectable: 'selectable',
                             disabled: 'disabled',
                         }}
                         listMode="MODAL"
                         placeholder="Select Vendor"
                         searchable={true}
                         placeholderStyle={{ color: colors.BLACK_2 }}
                         labelStyle={{ color: 'black' }}
                         modalTitle={'Vendors'}
                         open={showVendorPicker}
                         value={vendor}
                         mode={'BADGE'}
                         theme={'LIGHT'}
                         items={vendorList}
                         setOpen={() => {
                             setShowVendorPicker(true);
                         }}
                         onClose={() => {
                             setIsVendorFocused(false)
                             setShowVendorPicker(false);
                         }}
                         onPress={() => setIsVendorFocused(true)}
                         // @ts-ignore
                         setValue={async (val: Function) => {
                             const cc = val();
                             // console.log({cc})
                             setVendor(cc);
                             // await verifyAccount(cc, accountNumber)
                         }}
                         style={[styles.textInput, { backgroundColor: 'transparent', borderColor: isVendorFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED }]}
                         dropDownContainerStyle={styles.dropdownContainer}
                     />
                 </View>
                 <Text style={styles.inputLabel}>Phone Number</Text>
                 <TextInput value={phoneNumber}
                            onChangeText={text => setPhoneNumber(text)}
                            editable={true}
                            placeholder='Phone Number'
                            placeholderTextColor={colors.BLACK_2}
                            // autoFocus
                            onFocus={() => setIsPhoneNumberFocused(true)}
                            onBlur={() => setIsPhoneNumberFocused(false)}
                            style={[styles.textInput, {borderColor: isPhoneNumberFocused? colors.INPUT_HIGHLIGHT_1: colors.INPUT_DISABLED}]}
                 />
                 <Image source={require("../../assets/rewardsWaiting.png")} style={styles.rewardsWaitingImg} />
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Airtime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 44,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingTop: 30,
    },
    logo: {
        width: 180,
        height: 150,
        resizeMode: 'stretch',
        marginBottom: 20,
        alignSelf: "center"
    },
    balanceCardContainer: {
        // flex: 1,
        // flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50,
        alignSelf: "center",
    },
    textInput: {
        height: 50,
        width: '100%',
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 16,
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
    beneficiaryImage: {
        width: 50,
        height: 50,
        borderRadius: 60
    },
    beneficiaryName: {
        color: "#8C8C96",
        fontWeight: 500,
        fontSize: 12,
        marginBottom: 28,
    },
    beneficiariesContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    beneficiaryItem: {
        alignItems: 'center'
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: 700,
        color: colors.BLACK_1,
        textAlign: 'left',
        marginBottom: 5,
    },
    rewardsWaitingImg: {
        width: '100%',
        height: 156,
        resizeMode: 'stretch',
        marginTop: 20,
    },
})
