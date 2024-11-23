import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import NewPost from '../screens/NewPost';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Twitter" component={Home} options={
                { tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
            } />
            <Tab.Screen name="NewPost" component={ NewPost } options={
                    { tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" />}
                    }/>
        </Tab.Navigator>
    )
}

export default HomeMenu;