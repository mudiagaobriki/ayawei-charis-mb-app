import React from 'react';
import {ImageBackground, Text, TouchableOpacity, StyleSheet} from "react-native";
import {colors} from "../../assets/colors";

const SecondaryButton = ({onPress, text, width='100%', height=55, br=10, mt=0, mb=0, textSize=17, textWeight = 700}) => {
    const styles = {
        mainButton: {
            height: height,
            width: width,
            borderRadius: br,
            marginTop: mt,
            marginBottom: mb,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.PRIMARY,
        },
        buttonText: {
            color: colors.PRIMARY,
            fontSize: textSize,
            fontWeight: textWeight,
        }
    }


    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default SecondaryButton;