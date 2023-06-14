import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

// Navigations
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Init Store
import {store} from "./src/utils/store";

// Stacks
import OnboardingStack from "./src/ui/stacks/OnboardingStack/OnboardingStack";
import HomeStack from "./src/ui/stacks/HomeStack/HomeStack";
import AuthStack from "./src/ui/stacks/AuthStack/AuthStack";

const App = () => {
    const Stack = createNativeStackNavigator();
    const user = {name: "Testi Tester"};

  return (
      <Provider store={store}>
          <StatusBar style="auto" />
              <NavigationContainer>
                  <Stack.Navigator>
                      {!user
                          ? <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}} />
                          :
                          <>
                              <Stack.Screen name="OnboardingStack" component={OnboardingStack} options={{headerShown: false}} />
                              <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}} />
                          </>
                      }
                  </Stack.Navigator>
              </NavigationContainer>
      </Provider>
  );
};

export default App;
