import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatList from '../page/chatlist';
import ContactList from '../page/contact';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={ChatList} />
      <Tab.Screen name="Contact" component={ContactList} />
    </Tab.Navigator>
  );
}
export default MyTabs;