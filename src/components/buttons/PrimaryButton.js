import React from 'react';
import {ImageBackground, Text, TouchableOpacity, StyleSheet} from "react-native";

const PrimaryButton = ({onPress, text, loading=false, width='100%', height=55, br=10, mt=0, mb=0,  textSize=17, textWeight = 700}) => {
    const styles = {
        mainButton: {
            height: height,
            width: width,
            borderRadius: br,
            marginTop: mt,
            marginBottom: mb,
        },
        buttonBackground: {
            flex:1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'cover',
        },
        backgroundImgStyle:{
            borderRadius: br,
        },
        buttonText: {
            color: 'white',
            fontSize: textSize,
            fontWeight: textWeight,
        }
    }


    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <ImageBackground source={require('../../assets/button-bg.png')}
                             style={styles.buttonBackground}
                             imageStyle={styles.backgroundImgStyle}>
                <Text style={styles.buttonText}>{loading? "Busy" : text}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default PrimaryButton;