/**
 * Navigate stack
 * @author dattd
 * @since 2020
 * @version 1.0.0
 */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {Style} from '@common/index';
import {Images} from '@config';
import {Base} from '../stores';
import {Image} from 'react-native';
import React from 'react';
import {Pattern, Splash} from '@screens';
import TabBar from './TabBar';

const TabParentStack = createMaterialTopTabNavigator();

const TabParentStackScreen = () => (
  <TabParentStack.Navigator
    tabBar={props => <TabBar {...props} />}
    initialRouteName={'Trang chủ'}
    swipeEnabled={true}
    lazy={true}
    tabBarPosition={'bottom'}
    tabBarOptions={{
      activeTintColor: '#d17431',
      inactiveTintColor: '#959595',
    }}>
    <TabParentStack.Screen
      name={''}
      component={Splash}
      options={{
        tabBarIcon: ({color}) => (
          <Image
            // source={Images.ic_home}
            style={[Style.iconTabBottom, {tintColor: color}]}
          />
        ),
      }}
    />
    <TabParentStack.Screen
      name={''}
      component={Pattern}
      options={{
        tabBarIcon: ({color}) => (
          <Image
            // source={Images.ic_card_person_gray}
            style={[Style.iconTabBottom, {tintColor: color}]}
          />
        ),
      }}
    />
  </TabParentStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName={''} options={{headerShown: false}}>
    <AuthStack.Screen name={'Splash'} component={Splash} />
  </AuthStack.Navigator>
);

const Stack = createStackNavigator();
@observer
class RootStack extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={''} options={{headerShown: false}}>
          <Stack.Screen name={'Splash'} component={Splash} />
          <Stack.Screen name={'AuthStackScreen'} component={AuthStackScreen} />
          <Stack.Screen
            name="ParentStackScreen"
            component={TabParentStackScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootStack;
