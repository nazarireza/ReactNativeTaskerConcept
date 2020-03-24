import React from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';

import Animated, {
  cond,
  eq,
  block,
  set,
  useCode,
  call,
  sub,
  add,
  greaterThan,
  lessThan,
} from 'react-native-reanimated';
import {
  bInterpolate,
  onGestureEvent,
  useValues,
  timing,
} from 'react-native-redash';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Edit from './assets/edit.svg';
import EditLight from './assets/edit_light.svg';
import CateogryListItem from './CurrentListItem';
import CategoryItem from './CategoryItem';

const TOP_MARGIN = 60;
const DRAG_DISTANCE_FOR_DISMISS = 200;

export default ({
  color: backgroundColor,
  theme,
  title,
  items,
  position: {x = 0, y = 0, width: elementWidth = 0, height: elementHeight = 0},
  progress,
  onDismiss,
  open,
  scrollYOffset,
}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [translationY, state, translateY] = useValues(
    [0, State.UNDETERMINED, 0],
    [],
  );
  const opacity = cond(progress, 1, 0);
  const bodyOpacity = bInterpolate(progress, 0, 1);
  const summaryOpacity = bInterpolate(progress, 1, 0);
  const left = bInterpolate(progress, x, 0);
  const width = bInterpolate(progress, elementWidth, windowWidth);
  const top = bInterpolate(
    progress,
    sub(y, scrollYOffset),
    add(translateY, TOP_MARGIN),
  );
  const height = bInterpolate(
    progress,
    elementHeight,
    sub(windowHeight - TOP_MARGIN, translateY),
  );

  useCode(
    () =>
      block([
        cond(
          eq(state, State.ACTIVE),
          [
            set(translateY, translationY),
            cond(
              greaterThan(translationY, DRAG_DISTANCE_FOR_DISMISS),
              call([], onDismiss),
            ),
          ],
          cond(
            eq(state, State.END),
            cond(
              lessThan(translationY, DRAG_DISTANCE_FOR_DISMISS),
              set(
                translateY,
                timing({from: translationY, to: 0, duration: 200}),
              ),
              call([], onDismiss),
            ),
          ),
        ),
      ]),
    [],
  );
  useCode(() => set(translateY, 0), [y]);
  const isDark = theme === 'DARK';
  const color = isDark ? 'rgba(0,0,0,.9)' : '#FFFFFF';

  return (
    <PanGestureHandler
      {...onGestureEvent({translationY, state})}
      enabled={open}>
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.container,
          {
            backgroundColor,
            left,
            top,
            width,
            height,
            opacity,
          },
        ]}>
        <View style={styles.indicator} />
        <Animated.View style={{opacity: bodyOpacity}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.titleText, {color}]}>{title}</Text>
              <Text
                style={[
                  styles.subTitleText,
                  {color},
                ]}>{`${items?.length} tasks`}</Text>
            </View>
            {isDark ? <Edit /> : <EditLight />}
          </View>
          {items?.map((item, index) => (
            <CateogryListItem key={`${index}`} {...item} {...{theme}} />
          ))}
        </Animated.View>
        <Animated.View
          style={[styles.summaryContainer, {opacity: summaryOpacity}]}>
          <CategoryItem {...{color: backgroundColor, theme, title, items}} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  indicator: {
    width: 40,
    height: 5,
    marginTop: 7,
    backgroundColor: 'rgba(0,0,0,.2)',
    alignSelf: 'center',
    borderRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: 60,
    marginRight: 16,
    marginVertical: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 16,
    opacity: 0.5,
  },
  summaryContainer: {
    ...StyleSheet.absoluteFillObject,
    top: -8,
  },
});
