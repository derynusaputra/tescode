import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { sizes } from "../constants/sized";
import { Icon } from "@rneui/base";
// import Gap from "../components/Gap/Gap";
import { useNavigation, useTheme } from "@react-navigation/native";
import Gap from "../components/Gap/Gap";

const Headers = ({
  onPressIcon,
  backgroundColor,
  icColor,
  title,
  onPress,
  icName = "arrow-back-ios",
}) => {
  const theme = useTheme();
  const navigate = useNavigation();
  const { colors } = theme;
  return (
    <View
      style={{
        // height: sizes(50),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: sizes(7),
        paddingVertical: sizes(7),
        borderBottomWidth: 1,
        borderBottomColor: colors?.greyMedium,
        backgroundColor: colors?.white,
      }}
    >
      <Icon
        onPress={() => {
          if (!onPress) {
            console.log("taiasad");
            navigate?.pop();
          } else {
            onPress?.();
          }
        }}
        name={icName}
        type="material"
        size={sizes(20)}
        color={icColor ? icColor : colors?.black}
        style={{
          height: sizes(38),
          width: sizes(38),
          //   backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          fontSize: sizes(16),
          color: icColor ? icColor : colors?.black,
        }}
      >
        {title ?? ""}
      </Text>
      <Gap width={sizes(38)} />
      {/* <Icon
        onPress={onPressIcon}
        name="arrow-back-ios"
        type="material"
        size={sizes(20)}
        color={"red"}
        style={{ marginRight: sizes(5), marginBottom: sizes(5) }}
      /> */}
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({});
