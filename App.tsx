import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";

// Init Store
import { store } from "./src/utils/store";

// Stack
import GlobalStack from "./src/ui/stacks/GlobalStack/GlobalStack";
import { SupabaseProvider } from "./src/utils/supabase";
import {Platform} from "react-native";
import {useEffect, useRef, useState} from "react";

// Notifications
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
};

const App = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <SupabaseProvider>
        <GlobalStack />
      </SupabaseProvider>
    </Provider>
  );
};

export default App;
