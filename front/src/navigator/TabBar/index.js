import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {getHeight, getWidth, hasNotch} from '@common/index';

export default function TabBar({
  state,
  descriptors,
  navigation,
  activeTintColor,
  inactiveTintColor,
}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            {options.tabBarIcon({
              color: isFocused ? activeTintColor : inactiveTintColor,
            })}
            {isFocused ? <View style={styles.activeIndicator} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#183fd8',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(11),
    paddingBottom: hasNotch() ? getHeight(27) : 0,
  },
  tab: {
    minWidth: getWidth(60),
    alignItems: 'center',
    position: 'relative',
    paddingTop: getHeight(10),
    paddingBottom: getHeight(10),
  },
  activeIndicator: {
    position: 'absolute',
    backgroundColor: '#48d2ff',
    height: getHeight(2),
    width: '100%',
    bottom: 0,
  },
});
