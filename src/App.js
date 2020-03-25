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
  useValues,
} from 'react-native-redash';
import Animated, {event, Easing} from 'react-native-reanimated';

const DURATION = 700;
const INITIAL_CATEGORY_DATA = {
  index: -1,
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
    easing: Easing.bezier(0.1, 0.45, 0.02, 1),
  });

  const opacity = bInterpolate(progress, 1, 0.7);
  const scale = bInterpolate(progress, 1, 0.9);
  const borderRadius = bInterpolate(progress, 0, 16);

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
              <CurrentListItem key={`${index}`} {...item} theme="DARK" />
            ))}
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoriesTitleText}>Lists</Text>
              {categories.map((item, index) => (
                <CategoryItem
                  key={`${index}`}
                  {...item}
                  onGetPosition={position =>
                    (categoryItemLayout.current[index] = position)
                  }
                  onPress={() => {
                    setSelectedCategory({
                      index,
                      position: categoryItemLayout.current[index],
                    });
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
