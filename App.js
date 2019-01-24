import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,TextInput,TouchableOpacity } from 'react-native';
//import Icon from '@expo/vector-icons/Ionicons';
/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
       <TextInput style ={styles.txtinput} placeholder="username"/>
       <TextInput style ={styles.txtinput} placeholder="password" secureTextEntry/>


         <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Text style={styles.btnText} > Login </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons} onPress={()=> alert("signup button pressed!")} >
            <Text style={styles.btnText}> Register </Text>
          </TouchableOpacity>   
         </View>



      </View> 


      
    );
  }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class FeedStack extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button
          title="Go to Detail Screen"
          onPress={() => this.props.navigation.navigate('Detail')}
        />
      </View>
    );
  }
}

class SettingsStack extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class ProfileStack extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}

//////////////////////////////////////////////////HALAMAN
const Detail = props => (<View style={{ flex:1, alignItems:'center',justifyContent:'center'}}><Text>Detail</Text></View>);

const Feed = createStackNavigator({
  Feed:{
    screen: FeedStack,
    navigationOptions: ({navigation}) =>{
      return{
        headerTitle : 'Feed ',
      headerLeft:(
        <Text onPress={() => navigation.openDrawer()}>back</Text>
      )
    }}
  },
  Detail:{
    screen: Detail
  }
});


const Settings = createStackNavigator({
  Feed:{
    screen: SettingsStack,
    navigationOptions: ({navigation}) =>{
      return{
        headerTitle : 'Settings ',
      headerLeft:(
        <Text onPress={() => navigation.openDrawer()}>back</Text>
      )
    }}
  },
  Detail:{
    screen: Detail
  }
});

const Profile = createStackNavigator({
  ProfileStack:{
    screen: ProfileStack,
    navigationOptions: ({navigation}) =>{
      return{
        headerTitle : 'Profile',
      headerLeft:(
        <Text onPress={() => navigation.openDrawer()}>back</Text>
      )
    }}
  },
  Detail:{
    screen: Detail
  }
});
const DashboardTabNavigator = createBottomTabNavigator(
  {
    Feed,
    Profile,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header:null,
        headerTitle: routeName
      };
    }
  }
);




const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Text onPress={() => navigation.openDrawer()}>back</Text>
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },btnContainer:{
    flexDirection:"row",
    justifyContent: "space-between",
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    color:"blue",
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },txtinput:{
    width:"90%",
    backgroundColor:"white",
    color:"blue",
    marginBottom:10,
    padding:10,
  },buttons:{
    backgroundColor:"black",
    padding:15,
    width:"45%",
    
  },btnContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"90%",


  },btnText:{
    fontSize:18,
    textAlign:"center",
    color:"yellow",


  },
});
