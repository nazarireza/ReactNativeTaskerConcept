import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Unmarked from './assets/unmarked.svg';
import UnmarkedLight from './assets/unmarked_light.svg';
import Alarm from './assets/alarm.svg';
import AlarmLight from './assets/alarm_light.svg';

export default ({text, tagColor, dueTime, theme}) => {
  const isDark = theme === 'DARK';
  const color = isDark ? 'rgba(0,0,0,.9)' : '#FFFFFF';
  return (
    <View style={styles.currentListItemContainer}>
      {isDark ? <Unmarked /> : <UnmarkedLight />}
      <View style={styles.currentListItemInnerContainer}>
        <View style={styles.currentListItemTextContainer}>
          <Text style={[styles.currentListItemText, {color}]}>{text}</Text>
          {dueTime !== '' && (
            <View style={styles.currentListItemDueTimeContainer}>
              {isDark ? <Alarm /> : <AlarmLight />}
              <Text style={[styles.currentListItemDueTimeText, {color}]}>
                {dueTime}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.currentListItemTagContainer,
            {backgroundColor: tagColor},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  currentListItemInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 19,
    paddingRight: 16,
    borderBottomColor: 'rgba(0,0,0,.1)',
    marginLeft: 12,
  },
  currentListItemTextContainer: {
    flex: 1,
  },
  currentListItemText: {
    fontSize: 18,
  },
  currentListItemTagContainer: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  currentListItemDueTimeText: {
    marginHorizontal: 2,
    fontSize: 14,
    opacity: 0.5,
  },
  currentListItemDueTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
