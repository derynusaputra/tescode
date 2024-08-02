import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { sizes } from "@app/constants/sized";
import TextCustom from "@app/components/Text/TextCustom";
import { formatToRupiah } from "@app/services/Helper";

const CardProductDetail = ({ value, index }) => {
  const { colors } = useTheme();
  console.log({ value });

  const totalPrice =
    value?.quantity === 0 ? 1 : value?.quantity * value?.product?.price;

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
    <View style={{ marginBottom: sizes(16) }}>
      <TitleValue title={"Product Name"} value={value?.product?.name} />
      <TitleValue
        title={"Price"}
        value={`${formatToRupiah(value?.product?.price ?? 0)} `}
      />
      <TitleValue title={"Quantity"} value={`${value?.quantity}`} />

      <TitleValue
        title={"Total Price"}
        value={formatToRupiah(totalPrice ?? 0)}
        color={colors?.greyMedium}
      />
    </View>
  );
};

export default CardProductDetail;

const styles = StyleSheet.create({});
