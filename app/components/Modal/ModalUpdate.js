import {
  ActivityIndicator,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native-paper";
// import Gap from "../Gap/Gap";
// import {sizes} from "../../constants/sized";
// import {Satellite} from "../../services/satellite";
import { useSelector } from "react-redux";
import Gap from "../Gap/Gap";
import { sizes } from "@app/constants/sized";
import { useTheme } from "@react-navigation/native";

const ModalUpdate = ({
  title = "",
  isModal,
  setIsModal,
  onPressConfirm,
  isLoading = false,
  //   valPass,
  //   setValPass,
  isActive = false,
}) => {
  const theme = useTheme();

  const colors = theme;

  return (
    <Modal
      visible={isModal}
      onDismiss={() => setIsModal(!isModal)}
      style={{
        justifyContent: "center",
        // zIndex: 99999,
        // position: "absolute",
      }}
      contentContainerStyle={{
        backgroundColor: "white",
        margin: sizes(16),
        borderRadius: sizes(4),
        padding: sizes(24),
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: sizes(17),
          color: "#002D40",
          textAlign: "center",
        }}
      >
        Are you sure to delete this?
      </Text>
      <Text
        style={{
          textAlign: "center",

          fontFamily: "Poppins-Medium",
          fontSize: sizes(12),
          color: "#4F4F4F",
          marginTop: sizes(15),
          marginBottom: sizes(15),
        }}
      >
        {"You can't recover data because it will be deleted permanently."}
      </Text>

      <Gap height={sizes(25)} />

      <Pressable
        onPress={onPressConfirm}
        style={{
          backgroundColor: colors?.white,
          paddingVertical: sizes(15),
          alignItems: "center",
          borderRadius: sizes(4),
          borderWidth: 1,
          borderColor: "#EB5757",
        }}
      >
        {isLoading ? (
          <ActivityIndicator color={"grey"} size="small" />
        ) : (
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: sizes(12),
              color: "#EB5757",
            }}
          >
            {"Yes, delete it"}
          </Text>
        )}
      </Pressable>
      <Gap height={sizes(10)} />

      <Pressable
        onPress={() => setIsModal(false)}
        style={{
          backgroundColor: "#052A49",
          borderColor: colors?.green,
          borderWidth: 1,
          paddingVertical: sizes(13),
          alignItems: "center",
          borderRadius: sizes(4),
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: sizes(12),
            color: "white",
          }}
        >
          {"Back"}
        </Text>
      </Pressable>
    </Modal>
  );
};

export default ModalUpdate;

const styles = StyleSheet.create({});
