/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useRef, useState} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {currentList, categories} from './Constant';
import More from './assets/more.svg';
import CurrentListItem from './CurrentListItem';
import CategoryItem from './CategoryItem';
import CategoryDetail from './CategoryDetail';

import {
  useTimingTransition,
  bInterpolate,
  timing,
  useValues,
} from 'react-native-redash';
import Animated, {
  and,
  cond,
  greaterThan,
  lessThan,
  eq,
  event,
} from 'react-native-reanimated';

const DURATION = 300;
const DELAY_RATE = 0.3;
const INITIAL_CATEGORY_DATA = {
  index: 0,
  position: {},
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    INITIAL_CATEGORY_DATA,
  );
  const [open, setOpen] = useState(false);
  const categoryItemLayout = useRef([]);
  const [scrollYOffset] = useValues([0], []);

  const progress = useTimingTransition(open, {
    duration: DURATION,
  });
  const secondaryProgress = cond(
    and(greaterThan(progress, DELAY_RATE), lessThan(progress, 1)),
    timing({
      duration: DURATION - DURATION * DELAY_RATE,
      from: open ? 0 : 1,
      to: open ? 1 : 0,
    }),
    cond(eq(progress, 1), 1),
  );

  const opacity = bInterpolate(secondaryProgress, 1, 0.7);
  const scale = bInterpolate(secondaryProgress, 1, 0.9);
  const borderRadius = bInterpolate(secondaryProgress, 0, 16);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Animated.View
          style={[
            styles.container,
            {opacity, borderRadius, transform: [{scale}]},
          ]}>
          <Animated.ScrollView
            onScroll={event([
              {nativeEvent: {contentOffset: {y: scrollYOffset}}},
            ])}
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
                <CategoryItem
                  key={`${index}`}
                  {...item}
                  onGetPosition={position =>
                    categoryItemLayout.current.push({index, position})
                  }
                  onPress={() => {
                    const selectedCategoryItemLayout = categoryItemLayout.current.find(
                      p => p.index === index,
                    );
                    setSelectedCategory(selectedCategoryItemLayout);
                    setOpen(true);
                  }}
                />
              ))}
            </View>
          </Animated.ScrollView>
        </Animated.View>
        <CategoryDetail
          {...categories[selectedCategory.index]}
          position={selectedCategory.position}
          {...{progress, open, scrollYOffset}}
          onDismiss={() => setOpen(false)}
        />
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
