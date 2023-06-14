import Home from "../../screens/Home/Home";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const HomeStack = () => {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} options={{headerShown: true, headerTransparent: true, drawerType: 'front', headerTitle: ''}} />
        </Drawer.Navigator>
    );
};

export default HomeStack;