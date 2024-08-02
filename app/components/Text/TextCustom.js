import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import { sizes } from "../../constants/sized";
import { FONTS } from "../../constants/theme";

// type FontFamily = 'Poppins-Regular' | 'Poppins-Medium' | 'Poppins-Semibold';

const TextCustom = ({
  value = "",
  style = {},
  numberOfLines = null,
  width = null,
  fontFamily,
  color,
  fontSize,
  textAlign = "left",
}) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      style={{
        textAlign: textAlign,
        fontFamily: fontFamily ?? FONTS?.fontsRegular,
        fontSize: fontSize ?? sizes(12),
        color: color ?? colors?.black,
        ...style,
        width: width,
      }}
    >
      {value}
    </Text>
  );
};

export default TextCustom;

const styles = StyleSheet.create({});
