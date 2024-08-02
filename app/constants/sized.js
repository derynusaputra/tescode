import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const _width = 360;
const _height = 813;

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const sizes = (size) => screenWidth * (size / _width);

const isIpad = Dimensions.get("window").width >= 600;

const useScreenWidth = () => {
  const [screenWidths, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get("window").width);
    };

    Dimensions.addEventListener("change", updateScreenWidth);

    return () => {
      Dimensions.removeEventListener("change", updateScreenWidth);
    };
  }, []);

  return screenWidths;
};

// const insets = useSafeAreaInsets();
// const topInset = insets.top;
// const bottomInset = insets.bottom;

// export const topInset = insets.top;

export {
  // bottomInset,
  // topInset,
  useScreenWidth,
  isIpad,
  sizes,
  screenWidth,
  screenHeight,
};
