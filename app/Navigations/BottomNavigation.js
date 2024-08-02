import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../screens/chat/Chat";
import BottomTab from "../layout/BottomTab";
import { SafeAreaView } from "react-native";
import { useTheme } from "@react-navigation/native";
import NearBy from "../screens/nearby/NearBy";
import Encounters from "../screens/encounters/Encounters";
import Likes from "../screens/likes/Likes";
import Profiles from "../screens/profiles/Profiles";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Tab.Navigator
        tabBar={(props) => <BottomTab {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Nearby" component={NearBy} />
        <Tab.Screen name="Encounters" component={Encounters} />
        <Tab.Screen name="Likes" component={Likes} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profiles} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default BottomNavigation;
