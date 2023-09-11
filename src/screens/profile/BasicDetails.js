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
import {useNavigation, useRoute} from '@react-navigation/native';
import NavigationNames from "../../navigation/NavigationNames";
import {useDispatch, useSelector} from "react-redux";
import {selectUserName} from "../../redux/features/auth/authSlice";
import {getProfile, newProfile} from "../../services/auth/authService";
import {updateProfileStatus} from "../../redux/features/user/userSlice";
// import {updateUser} from "../../utils/users";


const BasicDetails = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [otherNames, setOtherNames] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	// const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch()

    // const { username, id } = useSelector(state => state.auth)
    const { username, id } = route?.params

    console.log({username, id})

	const onSave = async () => {
        console.log("Clicked here")
        const response = await newProfile(id, firstName, lastName, email)

        if (response?.status !== "error"){
            dispatch(updateProfileStatus('basic-filled'))
            navigation.navigate(NavigationNames.Address, {id, firstName, lastName, email, username})
        }
        else{
            alert(response?.msg)
            return;
        }

        console.log({response})
        // navigation.navigate(NavigationNames.Address, {id, firstName, lastName, email, username})

    }

	return (
		<ScrollView contentContainerStyle={{padding: 30}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 50}}>
                 <Text style={styles.signupText}>Your Basic Details</Text>
				<View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>First Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="First name"
						onChangeText={text => setFirstName(text)}
						value={firstName}
						// keyboardType='text'
					/>
				</View>
				<View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Last Name</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Last name"
						onChangeText={text => setLastName(text)}
						value={lastName}
						// keyboardType='text'
					/>
				</View>
				 <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					 <Text>Email</Text>
					 <TextInput
						 style={[styles.textInput, {width: width - 160}]}
						 // placeholder="Phone number"
						 // keyboardType='email'
						 onChangeText={text => setEmail(text)}
						 value={email}
					 />
				 </View>
				<TouchableOpacity onPress={onSave} style={{width: width - 100,
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 250, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Next</Text>
				</TouchableOpacity>
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default BasicDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
    signupText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 50,
        alignSelf: "center",
    },
    textInput: {
        // width: "90%",
        borderRadius: 10,
        height: 45,
        backgroundColor:'#e5e5e5',
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        height: 60,
    },
    buttonLabel: {
        fontSize: 16,
    },
})
