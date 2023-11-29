import React from 'react';
import {colors} from "../../assets/colors";
import {Text} from "react-native";

const Heading = ({text, style={}, mb=0, mt=0, ml=0, mr=0, color= colors.PRIMARY, weight=900, size= 32, }) => {
    const textStyle = {
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        color: color,
        fontWeight: weight,
        fontSize: size,
        textAlign: 'center',
        ...style,
    }

    return (
        <Text style={textStyle}>
            {text}
        </Text>
    );
};

export default Heading;