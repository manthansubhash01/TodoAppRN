import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import All from './components/screens/All';
import Completed from './components/screens/Completed';
import Pending from './components/screens/Pending';
import AddTodo from './components/screens/AddTodo';
import Description from './components/screens/Description';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AllStack = () => {
  return(
      <Stack.Navigator >
        <Stack.Screen name = "AllStack" component={All} options={{ title: '' }} />
        <Stack.Screen name = "Description" component={Description} />
      </Stack.Navigator>
  )
} 

const PendingStack = () => {
  return(
      <Stack.Navigator >
        <Stack.Screen name = "PendingStack" component={Pending} options={{ title: '' }}/>
        <Stack.Screen name = "Description" component={Description} />
      </Stack.Navigator>
  )
} 

const CompletedStack = () => {
  return(
      <Stack.Navigator >
        <Stack.Screen name = "CompletedStack" component={Completed} options={{ title: '' }}/>
        <Stack.Screen name = "Description" component={Description} />
      </Stack.Navigator>
  )
} 

const Todos = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name = "All" component={AllStack} options={{
        tabBarIcon : () => { return <Ionicons name = "list" size = {25}/>}
      }}/>
      <Tab.Screen name = "Completed" component={Completed} options={{
        tabBarIcon : () => { return <Ionicons name = "checkmark" size = {25}/>}
      }}/>
      <Tab.Screen name = "Pending" component={PendingStack} options={{
        tabBarIcon : () => { return <Ionicons name = "time" size = {25}/>}
      }}/>
      <Tab.Screen name = "AddTodo" component={AddTodo} options={{
        tabBarIcon : () => { return <Ionicons name = "add-circle" size = {25}/>}
      }}/>
    </Tab.Navigator>
  )
}

const Settings = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>⚙️ Settings Screen</Text>
    </View>

  )
}

export default function App() {
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name = "Todos" component={Todos}/>
        <Drawer.Screen name = "Settings" component={Settings}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
