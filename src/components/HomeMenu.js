import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import Search from '../screens/Search';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Twitter" component={Home} options={
                { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
            } />
            <Tab.Screen name="NewPost" component={NewPost} options={
                { tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" /> }
            } />
            <Tab.Screen name='Search' component={Search} options={{
                tabBarIcon: () => <Feather name="search" size={24} color="black" />
            }} />
             <Tab.Screen name='Profile' component={Profile} options={{
                tabBarIcon: () => <Feather name="user" size={24} color="black" />
            }} />
        </Tab.Navigator>

    )
}

export default HomeMenu;