import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Headers from "@app/layout/Headers";
import { Satellite } from "@app/services/satellite";
import { useTheme } from "@react-navigation/native";
import { sizes } from "@app/constants/sized";
import TextCustom from "@app/components/Text/TextCustom";
import { FONTS } from "@app/constants/theme";
import Gap from "@app/components/Gap/Gap";
import { formatToRupiah } from "@app/services/Helper";
import CardProductDetail from "../component/CardProductDetail";

const OrderDetail = ({ navigation, route }) => {
  console.log(route?.params?.id);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [totalHarga, setTotalHarga] = useState(0);

  const getDetailProduct = async () => {
    setLoading(true);
    try {
      const { data } = await Satellite().get(`/api/order/${route?.params?.id}`);

      console.log(data);

      setDataDetail(data);

      const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => {
          return total + product?.product?.price * product.quantity;
        }, 0);
      };

      const totalPrice = calculateTotalPrice(data?.products);
      setTotalHarga(totalPrice);
    } catch (error) {
      // setErrMessage("error");
      console.log("getDetailProduct", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDetailProduct();
  }, []);

  const TitleData = ({ title, value }) => {
    return (
      <View style={{ marginTop: sizes(16) }}>
        <TextCustom value={title} fontSize={sizes(16)} color={colors?.black} />
        <Gap height={sizes(7)} />
        <TextCustom
          value={value}
          fontSize={sizes(20)}
          color={colors?.black}
          fontFamily={FONTS?.fontsBold}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <Headers title={"Detail Order"} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors?.white,
            paddingHorizontal: sizes(16),
          }}
        >
          <TitleData title={"Order ID"} value={dataDetail?.order_id ?? ""} />
          <TitleData
            title={"Customer Name"}
            value={dataDetail?.customer_name ?? ""}
          />
          <TitleData
            title={"Total Order Price"}
            value={formatToRupiah(totalHarga)}
          />
          <Gap height={sizes(16)} />

          <TextCustom
            value={"Product Detail"}
            fontSize={sizes(14)}
            // textAlign={""}
            color={colors?.grey2}
            fontFamily={FONTS?.fontsMedium}
          />
          <Gap height={sizes(16)} />
          {dataDetail?.products?.map((data, index) => {
            // setTotalHarga(totalHarga + data?.price);
            return <CardProductDetail value={data} index={index} />;
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
