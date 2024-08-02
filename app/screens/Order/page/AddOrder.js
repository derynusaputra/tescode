import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Headers from "@app/layout/Headers";
import { useTheme } from "@react-navigation/native";
import CustomInputs from "@app/components/Input/CustomInputs";
import { Formik } from "formik";
import CustomInputDropdown from "@app/components/Input/CustomInputDropdown";
import TextCustom from "@app/components/Text/TextCustom";
import { FONTS } from "@app/constants/theme";
import { sizes } from "@app/constants/sized";
import Gap from "@app/components/Gap/Gap";
import CardProduct from "../component/CardProduct";
import { Satellite } from "@app/services/satellite";
import { formatToRupiah } from "@app/services/Helper";
import produce from "immer";
import LoadingComp from "@app/components/Loading/LoadingComp";

const AddOrder = ({ navigation }) => {
  const { colors } = useTheme();

  const [valNominal, setValNominal] = useState("");
  const [valListProduct, setValListProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState(null);
  const [dataListProduct, setDataListProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const [qty, setQty] = useState("");

  const formikRef = useRef(null);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChanges = (text) => {
    // Remove non-digit characters
    const numericText = text.replace(/\D/g, "");
    // Format the number
    const formattedText = formatNumber(numericText);
    // Set the formatted text as the input value
    setValNominal(formattedText);
  };

  const getDataProduct = async () => {
    try {
      const { data } = await Satellite().get(`/api/products`);

      console.log(data?.data);
      setValListProduct(data?.data);
    } catch (error) {
      // setErrMessage("error");
      console.log("getDataProduct", error);
    }
  };

  const handleSave = async (value) => {
    setLoading(true);

    const transformedData = dataListProduct.map((item) => ({
      product_id: item.id,
      quantity: Number(item.qty),
    }));
    console.log(value?.cusTomerName, transformedData);

    try {
      const { data } = await Satellite().post(`/api/order`, {
        customer_name: value?.cusTomerName,
        products: transformedData,
      });
      console.log({ data });
    } catch (error) {
      console.log("handlePostInpaq", error);
    }
    setLoading(false);
    navigation?.pop();
  };

  const addProduct = () => {
    // const newProduct = {"_index": 2, "id": 3, "name": "Bespoke Frozen Gloves", "price": 470000, "qty": "1"};
    const newProduct = { ...dataProduct, qty };
    console.log({ newProduct });

    setDataListProduct((prevDataProduct) => {
      const existingProductIndex = prevDataProduct.findIndex(
        (product) => product.id === newProduct.id
      );

      if (existingProductIndex >= 0) {
        // Produk sudah ada, tambahkan qty
        return prevDataProduct.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              qty: String(parseInt(product.qty) + parseInt(newProduct.qty)),
            };
          }
          return product;
        });
      } else {
        // Produk belum ada, tambahkan produk baru
        return [...prevDataProduct, newProduct];
      }
    });

    // console.log({ dataAKu });
  };

  const total = useMemo(() => {
    setQty("");

    const calculateTotalPrice = (products) => {
      return products.reduce((total, product) => {
        return total + product.price * product.qty;
      }, 0);
    };

    const totalPrice = calculateTotalPrice(dataListProduct);
    return totalPrice;
  }, [dataListProduct]);

  const isActive = useMemo(() => {
    console.log({ qty });
    const active = qty === "0" || qty === "";

    return !active;
  });

  console.log({ isActive });

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          cusTomerName: "",
          qty: 0,
          idProduct: 0,
          kategory: "",
        }}
        onSubmit={(values) => {
          // console.log({ values });
          handleSave(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          values,
          errors,
          touched,
          isValid,
        }) => {
          const isComplete = () => {
            return (
              // values.pembayaran !== "" &&
              values.cusTomerName !== "" && dataListProduct?.length !== 0
            );
          };

          console.log(isComplete());

          return (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <Headers title={"Add New Order"} />
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: colors?.white,
                  paddingHorizontal: sizes(16),
                }}
              >
                <Gap height={sizes(16)} />

                <CustomInputs
                  name={"Customer Name *"}
                  placeholder={"Input customer name"}
                  // typeKeyboard="numeric"
                  isShow={false}
                  // defaultValue={noRek}
                  value={values?.cusTomerName}
                  onChangeText={(val) => handleChange("cusTomerName")(val)}
                />
                <View
                  style={{
                    paddingVertical: sizes(16),
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors?.greyMedium,
                  }}
                >
                  <TextCustom
                    value={"Product Detail"}
                    fontSize={sizes(14)}
                    // textAlign={""}
                    color={colors?.grey2}
                    fontFamily={FONTS?.fontsMedium}
                  />
                  <Gap height={sizes(16)} />
                  <CustomInputDropdown
                    title="Product Name *"
                    values={values?.kategory}
                    placeholder={"Pilih Product"}
                    data={valListProduct}
                    valueLabel="name"
                    onChangeText={(val) => {
                      setDataProduct(val);
                      handleChange("idProduct")(String(val.id));
                      handleChange("kategory")(String(val.name));
                    }}
                  />
                  <CustomInputs
                    isText={true}
                    name={"Price"}
                    placeholder={"Price"}
                    typeKeyboard="numeric"
                    isShow={false}
                    // defaultValue={noRek}
                    value={
                      dataProduct?.price
                        ? formatToRupiah(dataProduct?.price)
                        : "Price"
                    }
                    onChangeText={handleChanges}
                  />
                  <CustomInputs
                    name={"Quantity *"}
                    placeholder={"Input quantity"}
                    typeKeyboard="numeric"
                    isShow={false}
                    // defaultValue={noRek}
                    value={qty}
                    onChangeText={(val) => setQty(val ?? 0)}
                  />
                  <Pressable
                    disabled={!isActive}
                    onPress={() => {
                      addProduct();
                    }}
                    style={{
                      width: sizes(184),
                      height: sizes(38),
                      backgroundColor: isActive ? colors?.black : colors?.grey,
                      borderRadius: sizes(4),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextCustom
                      value={"Add Product"}
                      fontSize={sizes(15)}
                      // textAlign={""}
                      color={colors?.white}
                      fontFamily={FONTS?.fontsBold}
                    />
                  </Pressable>
                  <Gap height={sizes(8)} />
                </View>
                <Gap height={sizes(16)} />

                {/* product */}
                <TextCustom
                  value={"Daftar Product"}
                  fontSize={sizes(14)}
                  // textAlign={""}
                  color={colors?.grey2}
                  fontFamily={FONTS?.fontsMedium}
                />
                <Gap height={sizes(16)} />
                {dataListProduct?.map((data, index) => {
                  // setTotalHarga(totalHarga + data?.price);
                  return <CardProduct value={data} index={index} />;
                })}

                <Gap height={sizes(24)} />
                <CustomInputs
                  isText={true}
                  name={"Total Order Price"}
                  placeholder={"Total price"}
                  typeKeyboard="numeric"
                  isShow={false}
                  // defaultValue={noRek}
                  value={formatToRupiah(total)}
                  onChangeText={handleChanges}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: sizes(30),
                  }}
                >
                  <Pressable
                    onPress={() => {
                      navigation?.pop();
                    }}
                    style={{
                      width: sizes(160),
                      height: sizes(48),
                      //   backgroundColor: colors?.black,
                      borderRadius: sizes(4),
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: colors?.greyMedium,
                    }}
                  >
                    <TextCustom
                      value={"Back"}
                      fontSize={sizes(15)}
                      // textAlign={""}
                      color={colors?.black}
                      fontFamily={FONTS?.fontsBold}
                    />
                  </Pressable>
                  <Pressable
                    disabled={!isComplete()}
                    onPress={handleSubmit}
                    style={{
                      width: sizes(160),
                      height: sizes(48),
                      backgroundColor: isComplete()
                        ? colors?.blue
                        : colors?.grey,
                      borderRadius: sizes(4),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextCustom
                      value={"Save"}
                      fontSize={sizes(15)}
                      // textAlign={""}
                      color={colors?.white}
                      fontFamily={FONTS?.fontsBold}
                    />
                  </Pressable>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
      {loading ? <LoadingComp /> : null}
    </SafeAreaView>
  );
};

export default AddOrder;

const styles = StyleSheet.create({});
