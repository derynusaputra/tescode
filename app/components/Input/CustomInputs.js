import { View, Text, TextInput } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "@app/constants/theme";
import TextCustom from "../Text/TextCustom";
import { sizes } from "@app/constants/sized";

const CustomInputs = ({
  name,
  placeholder,
  typeKeyboard = "default",
  onChangeText,
  defaultValue = "",
  isShow = false,
  value,
  isText = false,
  color,
  isEdit = false,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        // height: sizes(59),
        // marginHorizontal: sizes(15),
        marginBottom: sizes(20),
        // marginTop: sizes(10),
        // backgroundColor: "red",
      }}
    >
      <TextCustom
        value={name}
        fontSize={sizes(13)}
        color={colors?.black}
        // fontFamily={FONTS?.fontsSemiBold}
      />
      <View
        style={{
          height: sizes(44),
          // paddingVertical: sizes(12),
          backgroundColor: isText ? color ?? colors?.greyMedium : "white",
          borderWidth: sizes(1),
          borderColor: colors?.greyMedium,
          borderRadius: sizes(1),
          marginTop: sizes(8),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {isShow ? (
          <Text style={{ marginLeft: sizes(10), color: colors?.green }}>
            Rp
          </Text>
        ) : null}
        {isText ? (
          <TextCustom
            value={value}
            fontSize={sizes(14)}
            color={colors?.black}
            style={{ marginLeft: sizes(12) }}
            fontFamily={FONTS?.fontsMedium}
          />
        ) : (
          <TextInput
            // value={defaultValue}

            value={value}
            // defaultValue={defaultValue}
            placeholder={placeholder}
            keyboardType={typeKeyboard}
            // onFocus={() => setFocused(true)}
            // onBlur={() => setFocused(false)}
            style={{
              //   backgroundColor: "red",
              // alignSelf:""
              height: sizes(44),
              fontSize: sizes(14),
              //   lineHeight: sizes(),
              paddingLeft: sizes(12),
              fontFamily: FONTS?.fontsMedium,
              color: colors?.greenDark,
            }}
            // onEndEditing={(text) => setNoRek(text)}
            onChangeText={onChangeText}
            placeholderTextColor={isEdit ? colors?.black : colors?.greyMedium}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInputs;
