import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStartedScreen from "../../screens/GetStartedScreen/GetStartedScreen";

const Stack = createNativeStackNavigator();
const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="GetStartedScreen" screenOptions={{ contentStyle: {backgroundColor: 'transparent'} }}>
      <Stack.Screen
        name="GetStartedScreen"
        component={GetStartedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
