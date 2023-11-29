import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import {colors} from "../../assets/colors";

const slides = [
  {
    key: 'one',
    title: 'Easy, Fast & Trusted',
    text: 'carry out transactions in seconds',
    image: require("../../assets/a-man-in-a-suit-and-bow-tie-holding-money-2022-07-07-01-08-51-utc.jpg"),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Seamless Payments',
    text: 'Pay your bills with one click',
    image: require("../../assets/cropped-view-of-african-american-waiter-with-termi-2022-11-12-01-18-42-utc.jpg"),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Free Transactions',
    text: 'Your first transactions are on us',
    image: require("../../assets/the-time-making-money-should-be-greater-than-the-t-2021-12-09-04-20-16-utc.jpg"),
    backgroundColor: '#22bcb5',
  }
];

const Splash = () => {
    const [showRealApp, setShowRealApp] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    const sliderRef = useRef();
    const navigation = useNavigation();

    // const dimension = useDimensions().window;

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  const _renderNextButton = () => {
    return (
        <TouchableOpacity
            onPress={() => handleNextCLicked()}
            style={{
                // marginTop: -20,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: "96%",
                height: 60,
                borderRadius: 10,
                backgroundColor: colors.PRIMARY,
                marginBottom: 30,
            }}>
                <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
    );
};

const _renderSkipButton = () => {
    return (
            <Text style={styles.skipBtnText}
            onPress={() => navigation.navigate(NavigationNames.Welcome)}
            >Skip</Text>
    );
};

const _renderDoneButton = () => {
  return (
      <TouchableOpacity
          onPress={() => _onDone()}
          style={{
              // marginTop: -20,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: "96%",
              height: 60,
              borderRadius: 10,
              backgroundColor: colors.PRIMARY,
              marginBottom: 30,
          }}>
              <Text style={styles.nextBtnText}>Done</Text>
      </TouchableOpacity>
  );
};

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // navigation.navigate(NavigationNames.Home);
    setShowRealApp(true);
    navigation.navigate(NavigationNames.Welcome);
  }


  const handleNextCLicked = () => {
    let current = sliderRef?.current;
    let index = current?.state?.activeIndex;
    console.log(index)

    current?.goToSlide(index + 1);
  }

  const handleSkipClicked = () => {
    // let current = sliderRef?.current;
    // let index = current?.state?.activeIndex;

    // current?.goToSlide(2);
    // navigation.navigate(NavigationNames.Home)
  }

    // if (showRealApp) {
    //     return <App />;
    // } else {
        return <AppIntroSlider
                    renderItem={_renderItem}
                    data={slides}
                    // onDone={_onDone}
                    dotClickEnabled
                    showSkipButton={true}
                    renderNextButton={_renderNextButton}
                    renderSkipButton={_renderSkipButton}
                    renderDoneButton={_renderDoneButton}
                    bottomButton
                    ref={sliderRef}
                    activeDotStyle={{backgroundColor: '#0aad47'}}
                     />;
    // }
}

export default Splash;

const styles = StyleSheet.create({
    slide: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: "50%",
        resizeMode: 'stretch',
        marginBottom: 20,
        borderRadius: 10,
    },
    nextBtnText: {
        color: 'white',
    },
    skipBtnText: {
        color: colors.PRIMARY,
        alignSelf: 'center',
        // marginBottom: 20,
    }
})
