import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "@react-navigation/native";
import Gap from "../Gap/Gap";
import { sizes } from "@app/constants/sized";
import { FONTS } from "@app/constants/theme";
import TextCustom from "../Text/TextCustom";

const datas = [
  { name: "Item 1", id: "1" },
  { name: "Item 2", id: "2" },
  { name: "Item 3", id: "3" },
  { name: "Item 4", id: "4" },
  { name: "Item 5", id: "5" },
  { name: "Item 6", id: "6" },
  { name: "Item 7", id: "7" },
  { name: "Item 8", id: "8" },
];

const CustomInputDropdown = ({
  isEdit = false,
  title,
  showTitle = true,
  showSearchs = true,
  data,
  clickButton,
  searchPlaceHolder,
  defaultButtonText,
  onSelect,
  disabled = false,
  defaultValue,
  values,
  onChangeText,
  isLoadingData,
  hideSearch = false,
  placeholder,
  valueLabel = "name",
}) => {
  const theme = useTheme();
  const { colors } = theme;

  const dropdownRef = useRef(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={{}}>
      {showTitle ? (
        <View>
          <TextCustom
            value={title}
            // width={sizes(130)}
            fontSize={sizes(13)}
            color={colors?.black}
            // fontFamily={FONTS?.fontsSemiBold}
          />
          <Gap height={sizes(8)} />
        </View>
      ) : null}

      {/* {renderLabel()} */}
      <Dropdown
        style={[
          {
            height: sizes(44),
            borderColor: colors?.greyMedium,
            borderWidth: 1,
            // borderRadius: sizes(1),
            paddingHorizontal: sizes(12),
          },
          isFocus && {},
        ]}
        placeholderStyle={{
          fontSize: sizes(14),
          fontFamily: FONTS?.fontsMedium,
          color: isEdit ? colors?.black : colors?.greyMedium,
        }}
        selectedTextStyle={{
          fontSize: sizes(14),
          fontFamily: FONTS?.fontsMedium,
          color: colors?.black,
        }}
        inputSearchStyle={{
          //   backgroundColor: "red",
          fontSize: sizes(14),
          fontFamily: FONTS?.fontsMedium,
          color: colors?.black,
        }}
        // iconStyle={styles.iconStyle}

        data={data}
        search={!hideSearch}
        maxHeight={300}
        valueField={valueLabel}
        labelField="name"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder="Search..."
        value={String(values)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        // onChange={(item) => {
        //   setValue(item.value);
        //   setIsFocus(false);
        //   values = item?.value;
        //   console.log({ item });
        // }}
        onChange={onChangeText}
        containerStyle={{ borderRadius: sizes(5) }}
        itemContainerStyle={{}}
        itemTextStyle={{
          fontSize: sizes(14),
          fontFamily: FONTS?.fontsMedium,
          color: colors?.black,
        }}
        // renderLeftIcon={() => (
        //   <Icon
        //     name={"arrow-down"}
        //     type="material-community"
        //     size={sizes(20)}
        //     color={isFocus ? colors?.green : colors?.red}
        //   />
        // )}
      />

      <Gap height={sizes(15)} />
    </View>
  );
};

export default CustomInputDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
