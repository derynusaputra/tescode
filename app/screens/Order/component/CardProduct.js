import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { sizes } from "@app/constants/sized";
import TextCustom from "@app/components/Text/TextCustom";
import { formatToRupiah } from "@app/services/Helper";

const CardProduct = ({ value, index }) => {
  const { colors } = useTheme();
  console.log({ value });

  const totalPrice = value?.qty === 0 ? 1 : value?.qty * value?.price;

  const TitleValue = ({ title, value, color }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: sizes(5),
          backgroundColor: color,
        }}
      >
        <TextCustom
          value={title}
          // width={sizes(130)}
          fontSize={sizes(13)}
          textAlign={"center"}
          color={colors?.grey}
        />
        <TextCustom
          value={value}
          // width={sizes(130)}
          fontSize={sizes(13)}
          textAlign={"center"}
          color={colors?.black}
        />
      </View>
    );
  };
  return (
    <View>
      <TitleValue title={"Product Name"} value={value?.name} />
      <TitleValue
        title={"Price"}
        value={`${formatToRupiah(value?.price ?? 0)} x ${value?.qty}`}
      />
      <TitleValue
        title={"   Total Price"}
        value={formatToRupiah(totalPrice ?? 0)}
        color={colors?.greyMedium}
      />
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({});
