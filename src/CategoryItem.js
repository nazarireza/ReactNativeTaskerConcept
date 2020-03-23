/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default ({
  color,
  foregroundColor,
  title,
  items: {length: itemCount},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.categoryContainer, {backgroundColor: color}]}>
      <Text style={[styles.categoryTitleText, {color: foregroundColor}]}>
        {title}
      </Text>
      <Text
        style={[
          styles.categoryItemsCountText,
          {color: foregroundColor},
        ]}>{`${itemCount} task`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTitleText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  categoryItemsCountText: {
    opacity: 0.5,
    fontSize: 14,
  },
});
