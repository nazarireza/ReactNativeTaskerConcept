/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

import {currentList, categories} from './Constant';
import More from './assets/more.svg';
import CurrentListItem from './CurrentListItem';
import CategoryItem from './CategoryItem';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Today</Text>
              <More />
            </View>
            {currentList.map((item, index) => (
              <CurrentListItem key={`${index}`} {...item} />
            ))}
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoriesTitleText}>Lists</Text>
              {categories.map((item, index) => (
                <CategoryItem key={`${index}`} {...item} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContentContainer: {
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // borderRadius: 8,
    // transform: [
    //   {
    //     scale: 0.9,
    //   },
    // ],
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  titleText: {
    flex: 1,
    fontSize: 32,
    marginLeft: 48,
    color: '#252A31',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginLeft: 58,
    marginRight: 16,
    marginTop: 32,
  },
  categoriesTitleText: {
    color: 'rgba(0,0,0,.3)',
    fontSize: 16,
    marginBottom: 7,
  },
});

export default App;
