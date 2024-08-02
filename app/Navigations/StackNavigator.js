import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import OrderPage from "@app/screens/Order/OrderPage";
import AddOrder from "@app/screens/Order/page/AddOrder";
import OrderDetail from "@app/screens/Order/page/OrderDetail";
import EditOrder from "@app/screens/Order/page/EditOrder";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme.dark ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.card}
      />
      <Stack.Navigator
        initialRouteName="OrderPage"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="OrderPage" component={OrderPage} />
        <Stack.Screen name="AddOrder" component={AddOrder} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="EditOrder" component={EditOrder} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
