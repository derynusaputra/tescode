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
import LoadingComp from "@app/components/Loading/LoadingComp";
import produce from "immer";

const EditOrder = ({ navigation, route }) => {
  const { colors } = useTheme();

  const [valNominal, setValNominal] = useState("");
  const [valListProduct, setValListProduct] = useState([]);
  const [dataProduct, setDataProduct] = useState(null);
  const [dataListProduct, setDataListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState(null);

  const [qty, setQty] = useState("");

  const formikRef = useRef(null);

  const getDetailProduct = async () => {
    // setLoading(true);
    try {
      const { data } = await Satellite().get(`/api/order/${route?.params?.id}`);

      setDataOrder(data);
    } catch (error) {
      // setErrMessage("error");
      console.log("getDetailProduct", error);
    }
    // setLoading(false);
  };

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

    console.log({ dataOrder });

    const transformData = dataOrder.products.map((p) => ({
      product_id: p.product.id,
      quantity: p.quantity,
    }));
    console.log({ transformData });

    try {
      const { data } = await Satellite().put(
        `/api/order/${route?.params?.id}`,
        {
          customer_name: dataOrder?.customer_name,
          products: transformData,
        }
      );
      console.log({ data });
      navigation?.pop();
    } catch (error) {
      // console.log("handlePostInpaq", error);
    }
    setLoading(false);
    //
  };

  const total = useMemo(() => {
    setQty("");

    const calculateTotalPrice = (data) => {
      return data?.products.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    };

    const totalPrice = calculateTotalPrice(dataOrder);
    return totalPrice;
  }, [dataOrder]);

  useEffect(() => {
    getDataProduct();
    getDetailProduct();
  }, []);

  const updateProduct = (index, databaru) => {
    const dataBS = {
      ...dataOrder,
      products: dataOrder.products.map((product, i) =>
        i === index ? databaru : product
      ),
    };

    setDataOrder(dataBS);
  };

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
              true
            );
          };

          return (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <Headers title={"Edit Order"} />
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: colors?.white,
                  paddingHorizontal: sizes(16),
                }}
              >
                <Gap height={sizes(16)} />

                <CustomInputs
                  isEdit
                  name={"Customer Name *"}
                  placeholder={`${dataOrder?.customer_name}`}
                  // typeKeyboard="numeric"
                  isShow={false}
                  // defaultValue={noRek}
                  value={dataOrder?.customer_name}
                  onChangeText={(val) => {
                    const newName = {
                      ...dataOrder,
                      customer_name: val,
                    };
                    setDataOrder(newName);
                  }}
                />

                <TextCustom
                  value={"Product Detail"}
                  fontSize={sizes(14)}
                  // textAlign={""}
                  color={colors?.grey2}
                  fontFamily={FONTS?.fontsMedium}
                />
                <Gap height={sizes(16)} />

                {dataOrder?.products?.map((value, index) => {
                  return (
                    <View
                      style={{
                        paddingVertical: sizes(16),
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: colors?.greyMedium,
                        backgroundColor: "#F8F8F8",
                        marginBottom: sizes(16),
                      }}
                    >
                      <Gap height={sizes(10)} />
                      <CustomInputDropdown
                        isEdit
                        title="Product Name *"
                        values={value?.name}
                        placeholder={`${value?.product?.name}`}
                        data={valListProduct}
                        valueLabel="name"
                        onChangeText={(val) => {
                          const databaru = {
                            quantity: 1,
                            product: {
                              name: val?.name,
                              price: val?.price,
                              id: val?.id,
                            },
                          };
                          updateProduct(index, databaru);

                          // setDataProduct(val);
                          // handleChange("idProduct")(String(val.id));
                          // handleChange("kategory")(String(val.name));
                        }}
                      />
                      <CustomInputs
                        color={"white"}
                        isText={true}
                        name={"Price"}
                        placeholder={"Price"}
                        typeKeyboard="numeric"
                        isShow={false}
                        // defaultValue={noRek}
                        value={
                          value?.product?.price
                            ? formatToRupiah(value?.product?.price)
                            : "Price"
                        }
                        onChangeText={handleChanges}
                      />
                      <CustomInputs
                        isEdit
                        name={"Quantity per Package *"}
                        placeholder={`${value?.quantity}`}
                        typeKeyboard="numeric"
                        isShow={false}
                        // defaultValue={noRek}
                        value={value?.quantity}
                        onChangeText={(val) => {
                          // const newQty = {
                          //   ...dataOrder,
                          //   products: dataOrder.products.map((product, i) => {
                          //     console.log({ product });
                          //     if (i === index) {
                          //       quantity = val;
                          //     }
                          //   }),
                          // };

                          const updatedData = { ...dataOrder };

                          // Perbarui produk pada indeks yang diberikan
                          if (
                            index >= 0 &&
                            index < updatedData.products.length
                          ) {
                            updatedData.products[index] = {
                              ...updatedData.products[index],
                              quantity: val === "" ? 1 : val,
                              product: {
                                ...updatedData.products[index].product,
                                id: updatedData.products[index].product.id + 1, // contoh perubahan lain jika diperlukan
                              },
                            };
                          }

                          setDataOrder(updatedData);
                        }}
                      />
                      <CustomInputs
                        isText={true}
                        name={"Total Price"}
                        placeholder={"Total Price"}
                        typeKeyboard="numeric"
                        isShow={false}
                        // defaultValue={noRek}
                        value={formatToRupiah(
                          value?.product?.price * value?.quantity
                        )}
                        onChangeText={handleChanges}
                      />
                    </View>
                  );
                })}

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

export default EditOrder;

const styles = StyleSheet.create({});
