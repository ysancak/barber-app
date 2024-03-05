import React, {useState, Children, cloneElement} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import TabContent from './TabContent';
import Text from '../Text';
import View from '../View';

import {colors} from '@/utils';

type Props = {
  activeIndex: number;
  children: React.ReactNode;
};

const TabView = ({children, activeIndex}: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);

  return (
    <View style={styles.container}>
      <View style={styles.tabButtonContainer}>
        {Children.map(children, (child, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={
              activeTabIndex === index
                ? styles.tabButtonView
                : styles.activeButtonView
            }
            onPress={() => setActiveTabIndex(index)}>
            <Text
              variant="subtitle"
              fontSize={15}
              color={activeTabIndex === index ? 'white' : colors.textColor}>
              {child.props.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>
        {Children.map(children, (child, index) =>
          cloneElement(child, {isActive: index === activeTabIndex}),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  contentContainer: {
    flex: 1,
  },
  tabButtonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    gap: 12,
    borderColor: colors.borderColor,
  },
  tabButtonView: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButtonView: {
    flex: 1,
    backgroundColor: colors.borderColor3,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Tab = {
  Container: TabView,
  Content: TabContent,
};

export default Tab;
