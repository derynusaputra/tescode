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
import { useIsFocused, useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Headers from "@app/layout/Headers";
import { sizes } from "@app/constants/sized";
import TextCustom from "@app/components/Text/TextCustom";
import OrderItem from "./component/OrderItem";
import { Satellite } from "@app/services/satellite";
import { FONTS } from "@app/constants/theme";
import ModalUpdate from "@app/components/Modal/ModalUpdate";

const OrderPage = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const isFocused = useIsFocused();

  const renderItem = ({ item, index }) => {
    return <OrderItem item={item} />;
  };
  const getOrder = async () => {
    setLoading(true);
    try {
      const { data } = await Satellite().get(
        `/api/orders?page=${page}&limit=10`
      );

      setData(data?.list);
    } catch (error) {
      // setErrMessage("error");
      console.log("getOrder", error);
    }
    setLoading(false);
  };

  const handleLoadMore = async () => {
    // setLoading(true);
    try {
      console.log({ page });
      const { data: datas } = await Satellite().get(
        `/api/orders?page=${page + 1}&limit=10`
      );

      console.log(data?.length, datas?.total);
      if (data?.length < datas?.total) {
        setPage(page + 1);
      }
      if (datas?.list) {
        setData([...data, ...datas?.list]);
      }
      // console.log({ data });

      // setData(data?.list);
    } catch (error) {
      // setErrMessage("error");
      console.log("handleLoadMore", error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    setData([]);
    setPage(0);
    getOrder();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <Headers
          title={"Order"}
          icName="add"
          onPress={() => {
            navigation?.navigate("AddOrder");
          }}
        />

        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={30}
          removeClippedSubviews={true}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: sizes(150) }}>
                <TextCustom
                  value={"Order is empty"}
                  // width={sizes(130)}
                  fontSize={sizes(12)}
                  textAlign={"center"}
                  color={colors?.greenDark}
                  fontFamily={FONTS?.fontsSemiBold}
                />
              </View>
            );
          }}
          onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.5}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderPage;

const styles = StyleSheet.create({});
