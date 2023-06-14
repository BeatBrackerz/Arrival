import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GetStarted from "../../screens/GetStarted/GetStarted";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return(
        <Stack.Navigator initialRouteName="GetStarted">
            <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default AuthStack;