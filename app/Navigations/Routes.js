import React, { useState } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { Provider } from "react-redux";
// import StackNavigator from "./StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "@app/store";
import StackNavigator from "./StackNavigator";
import { PaperProvider } from "react-native-paper";

const Routes = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const authContext = React.useMemo(
    () => ({
      setDarkTheme: () => {
        setIsDarkTheme(true);
      },
      setLightTheme: () => {
        setIsDarkTheme(false);
      },
    }),
    []
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,

      white: "#FFFFFF",
      black: "#052A49",
      red: "#FF0000",
      blue: "#2D9CDB",
      grey: "#4F4F4F",
      greyMedium: "#E0E0E0",
      grey2: "#828282",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      white: "#FFFFFF",
      black: "#052A49",
      red: "#FF0000",
      blue: "#2D9CDB",
      grey: "#4F4F4F",
      greyMedium: "#E0E0E0",
      grey2: "#828282",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <SafeAreaProvider>
      {/* <themeContext.Provider value={authContext}> */}
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer theme={theme}>
            <StackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
      {/* </themeContext.Provider> */}
    </SafeAreaProvider>
  );
};
export default Routes;
