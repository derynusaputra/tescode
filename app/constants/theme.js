import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const COLORS = {
  primary: "#2979F8",
  primary3: "#8810f7",
  primaryLight: "#7BAEFF",

  // pesantren
};

export const FONTS = {
  fontsRegular: "Poppins-Regular",
  fontsMedium: "Poppins-Medium",
  fontsSemiBold: "Poppins-SemiBold",
  fontsBold: "Poppins-Bold",
};

export const IMAGES = {
  // pesantren
  // icTopup: require("../assets/images/icons/ic_topup.png"),
  // gbr
  // gbrBayarBerulang: require("../assets/images/icons/gbr-pembayaran-berulang.png"),
};

export const VIDEO = {
  // video1: require("../assets/video/video1.mp4"),
};

const appTheme = { COLORS, FONTS, IMAGES, VIDEO };

export default appTheme;
