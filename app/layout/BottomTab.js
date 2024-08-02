import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS, IMAGES, SIZES, FONTS } from "../constants/theme";
import DropShadow from "react-native-drop-shadow";
import { GlobalStyleSheet } from "../constants/styleSheet";
import { useTheme } from "@react-navigation/native";
import { useEffect, useRef } from "react";

function BottomTab({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  const tabWidth = SIZES.width;

  const circlePosition = useRef(
    new Animated.Value(
      tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5
    )
  ).current;

  const tabW = tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabW,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: "row",
          position: "absolute",
          width: "auto",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.borderColor,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <View style={styles.tabItem} key={index}>
              <TouchableOpacity style={styles.tabLink} onPress={onPress}>
                <Image
                  style={[
                    {
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                      opacity: isFocused ? 1 : 0.6,
                      marginBottom: 6,
                      tintColor: isFocused ? COLORS.primary3 : colors.text,
                    },
                  ]}
                  source={
                    label === "Nearby"
                      ? IMAGES.pin
                      : label === "Encounters"
                      ? IMAGES.cards
                      : label === "Likes"
                      ? IMAGES.heart2
                      : label === "Chat"
                      ? IMAGES.chat2
                      : label === "Profile" && IMAGES.avatar
                  }
                />
                <Text
                  style={{
                    ...FONTS.fontXs,
                    color: isFocused ? colors.title : colors.textLight,
                    marginBottom: -2,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabLink: {
    alignItems: "center",
    padding: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    ...FONTS.fontSm,
  },
});

export default BottomTab;
