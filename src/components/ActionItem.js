import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import {colors} from "../assets/colors";

const ActionItem = ({titleText, subtitleText, progressValue=1, hasProgress=true, totalSteps=3, leftHeight=44,
                    leftWidth=44, progressRadius=22, leftBgColor=colors.PRIMARY, leftImgUrl="",
                    mb=23, leftImgWidth=29, leftImgHeight=24,
                    hasRightCaret=true, listIndex=1,}) => {

    let computedProgressValue = progressValue/totalSteps *100

    return (
        <View style={[styles.setupItemsContainer,{marginBottom: mb}]}>
            <View style={styles.item}>
                <View style={{flexDirection: 'row'}}>
                    {hasProgress && <View style={styles.progressContainer}>
                        <CircularProgress
                            value={computedProgressValue}
                            radius={22}
                            duration={2000}
                            progressValueColor={colors.PRIMARY}
                            activeStrokeColor={colors.PRIMARY}
                            maxValue={200}
                            title={`${progressValue}/${totalSteps}`}
                            titleColor={colors.BLACK_1}
                            titleStyle={{fontWeight: 'bold'}}
                            showProgressValue={false}
                        />
                    </View>}
                    {
                        !hasProgress && <View style={{width: leftWidth, height: leftHeight, marginRight: 12,
                        backgroundColor: leftBgColor, justifyContent: "center", alignItems: "center"}}>
                            <Image source={leftImgUrl} style={{width: leftImgWidth, height: leftImgHeight}} />
                        </View>
                    }
                    <View style={styles.textsContainer}>
                        <Text style={styles.titleText}>
                            {titleText}
                        </Text>
                        <Text style={styles.subText}>
                            {subtitleText}
                        </Text>
                    </View>
                </View>

                {hasRightCaret && <TouchableOpacity style={styles.arrowContainer}>
                    <Image source={require("../assets/caret-right.png")} style={{width: 24, height: 24}} />
                </TouchableOpacity>}
                {
                    !hasRightCaret && <View style={[styles.statusView,{
                        backgroundColor: progressValue >= listIndex? colors.STATUS_DONE: colors.STATUS_NOT_DONE
                    }]}>
                        <Text style={styles.statusText}>
                            {
                                progressValue >= listIndex? "Done": "Not Done"
                            }
                        </Text>
                    </View>
                }
            </View>
        </View>
    );
};

export default ActionItem;

const styles = StyleSheet.create({
    setupItemsContainer: {
        paddingTop: 22,
        paddingHorizontal: 15,
        justifyContent: 'center',
        width: "100%",
    },
    item: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
    },
    progressContainer: {
        marginRight: 12
    },
    arrowContainer: {
        alignSelf: 'flex-start',
    },
    textsContainer: {
        maxWidth:155,
    },
    titleText: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.BLACK_1,
    },
    subText: {
        fontSize: 12,
        fontWeight: 500,
        color: colors.LIGHT_GRAY_1,
    },
    statusView: {
        width: 61,
        height: 27,
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
    },
    statusText: {
        fontSize: 11,
        fontWeight: 700,
        color: "#ffffff"
    },
})