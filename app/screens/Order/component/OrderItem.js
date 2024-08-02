import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import TextCustom from "@app/components/Text/TextCustom";
import { sizes } from "@app/constants/sized";
import { FONTS } from "@app/constants/theme";
import { Icon } from "@rneui/base";
import Gap from "@app/components/Gap/Gap";
import { formatDate, formatToRupiah } from "@app/services/Helper";
import ModalUpdate from "@app/components/Modal/ModalUpdate";
import { Portal } from "react-native-paper";
import { Satellite } from "@app/services/satellite";

const OrderItem = ({ item }) => {
  const { colors } = useTheme();
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const { data } = await Satellite().delete(`/api/order/${item?.id}`);
      console.log(data);
    } catch (error) {
      // setErrMessage("error");
      console.log("deleteProduct", error);
    }
    setLoading(false);
    setIsModal(false);
  };

  const TitleValue = ({ title, value }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: sizes(5),
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

  const SectionButton = ({ title, value }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: sizes(16),
        }}
      >
        <Pressable
          onPress={() => {
            navigation?.navigate("EditOrder", { id: item?.id });
          }}
          style={{
            width: sizes(122),
            height: sizes(36),
            backgroundColor: colors?.black,
            borderRadius: sizes(4),
            justifyContent: "center",
          }}
        >
          <TextCustom
            value={"Edit"}
            fontSize={sizes(15)}
            textAlign={"center"}
            color={colors?.white}
            fontFamily={FONTS?.fontsBold}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            navigation?.navigate("OrderDetail", { id: item?.id });
          }}
          style={{
            width: sizes(122),
            height: sizes(36),
            borderRadius: sizes(4),
            backgroundColor: colors?.white,
            borderWidth: 1,
            borderColor: colors?.blue,
            justifyContent: "center",
          }}
        >
          <TextCustom
            value={"Detail"}
            // width={sizes(130)}
            fontSize={sizes(14)}
            textAlign={"center"}
            color={colors?.blue}
            fontFamily={FONTS?.fontsBold}
          />
        </Pressable>
        <Pressable
          onPress={() => setIsModal(true)}
          style={{
            width: sizes(36),
            height: sizes(36),
            borderRadius: sizes(4),
            backgroundColor: colors?.white,
            borderWidth: 1,
            borderColor: colors?.greyMedium,
            justifyContent: "center",
          }}
        >
          <Icon
            type={"material-community"}
            name={"delete-outline"}
            size={sizes(18)}
            color={colors?.red}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: sizes(16),
        marginTop: sizes(16),
        padding: sizes(16),
        borderWidth: 1,
        borderRadius: sizes(4),
        borderColor: colors?.greyMedium,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          borderBottomWidth: 1,
          paddingBottom: sizes(16),
          borderColor: colors?.greyMedium,
        }}
      >
        <TextCustom
          value={"Order Id"}
          // width={sizes(130)}
          fontSize={sizes(14)}
          textAlign={"center"}
          color={colors?.greenDark}
          fontFamily={FONTS?.fontsMedium}
        />
        <Gap height={sizes(5)} />
        <TextCustom
          value={item?.id}
          // width={sizes(130)}
          fontSize={sizes(14)}
          textAlign={"center"}
          color={colors?.greenDark}
          fontFamily={FONTS?.fontsBold}
        />
      </View>

      {/* val */}
      <TitleValue title={"Customer"} value={item?.customer_name} />
      <TitleValue
        title={"Total Products"}
        value={formatToRupiah(item?.total_products)}
      />
      <TitleValue
        title={"Total Price"}
        value={formatToRupiah(item?.total_price)}
      />
      <TitleValue
        title={"Order Date"}
        value={formatDate(item?.created_at ?? "2024-08-01T19:31:49.968Z")}
      />

      <SectionButton />

      <Portal>
        <ModalUpdate
          isModal={isModal}
          setIsModal={setIsModal}
          isLoading={loading}
          onPressConfirm={() => {
            deleteProduct();
          }}
        />
      </Portal>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
