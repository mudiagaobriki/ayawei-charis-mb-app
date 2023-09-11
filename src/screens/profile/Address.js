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
import {editProfile} from "../../services/auth/authService";
// import {updateUser} from "../../utils/users";


const Address = () => {
	const [userState, setUserSate] = useState('')
	const [lga, setLga] = useState('')
	const [area, setArea] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const {width, height} = useWindowDimensions();
	const route = useRoute();
	// const [username, setUsername] = useState(route?.params?.username);
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    const {id, firstName, lastName, email, username} = route?.params;

	const onSave = async () => {
        const response = await editProfile(id, {state: userState, lga, zip: area, address})

        console.log({response})

        if (response?.status !== "error"){
            navigation.navigate(NavigationNames.Identification, {id, firstName, lastName, email, username})
        }
        else{
            alert(response?.msg ?? response?.data)
        }
        // navigation.navigate(NavigationNames.Identification)
        // updateUser(username, {
        //     firstName,
        //     lastName,
        //     otherNames,
        //     phoneNumber,
        //     email,
        // })
        //     .then(res => {
        //         // console.log({res})
        //         Alert.alert('Parrot', 'Details saved successfully.')
        //         // setFirstName('')
        //         // setLastName('')
        //         // setOtherNames('')
        //         // setEmail('')
        //         // setPhoneNumber('')
        //     })
        //     .catch(err => {
        //         console.log({err})
        //         Alert.alert('Parrot', 'Error in saving basic details. Please try again.')
        //     })
    }

	return (
		<ScrollView contentContainerStyle={{padding: 30}}>
			<KeyboardAvoidingView behavior='position'>
			{loading && <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
				<ActivityIndicator size={30} color='green' />
				</View>}
			{!loading && <>
			 <View style={{marginTop: 50}}>
                 {/*<Image style={styles.logo} source={require('../../assets/logo.png')} />*/}
                 <Text style={styles.signupText}>Enter Your Address</Text>
				 {/*<Text style={{alignSelf: 'center', fontSize: 18, marginBottom: 30}}>Account Settings</Text>*/}
				<View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>State</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="First name"
						onChangeText={text => setUserSate(text)}
						value={userState}
						// keyboardType='text'
					/>
				</View>
				<View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>LGA</Text>
					<TextInput
						style={[styles.textInput, {width: width - 160}]}
						// placeholder="Last name"
						onChangeText={text => setLga(text)}
						value={lga}
						// keyboardType='text'
					/>
				</View>
				{/*<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
				{/*	<Text>Other Names</Text>*/}
				{/*	<TextInput*/}
				{/*		style={[styles.textInput, {width: width - 160}]}*/}
				{/*		// placeholder="Other names"*/}
				{/*		onChangeText={text=>setOtherNames(text)}*/}
				{/*		value={otherNames}*/}
				{/*		// keyboardType='numeric'*/}
				{/*	/>*/}
				{/*</View>*/}
				{/*<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>*/}
				{/*	<Text>Email</Text>*/}
				{/*	<TextInput*/}
				{/*		style={[styles.textInput, {width: width - 160}]}*/}
				{/*		// placeholder="Email address"*/}
				{/*		// keyboardType='numeric'*/}
				{/*		onChangeText={text => setEmail(text)}*/}
				{/*		value={email}*/}
				{/*	/>*/}
				{/*</View>*/}
				 <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					 <Text>Area</Text>
					 <TextInput
						 style={[styles.textInput, {width: width - 160}]}
						 // placeholder="Phone number"
						 // keyboardType='email'
						 onChangeText={text => setArea(text)}
						 value={area}
					 />
				 </View>
                 <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Text>Address</Text>
                     <TextInput
                         style={[styles.textInput, {width: width - 160}]}
                         // placeholder="Phone number"
                         // keyboardType='email'
                         onChangeText={text => setAddress(text)}
                         value={address}
                     />
                 </View>
				<TouchableOpacity onPress={onSave} style={{width: width - 100,
					alignSelf: 'center', height: 55, backgroundColor: 'black',
					 marginTop: 180, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
					<Text style={{color: 'white', fontWeight: '700'}}>Next</Text>
				</TouchableOpacity>
			</View>
			</>}
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

export default Address;

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
