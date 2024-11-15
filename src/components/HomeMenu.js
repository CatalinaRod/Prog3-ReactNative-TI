import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
            } />
        </Tab.Navigator>
    )
}

export default HomeMenu;