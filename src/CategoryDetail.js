import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';

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

const TOP_MARGIN = 60;
const DRAG_DISTANCE_FOR_DISMISS = 200;

export default ({
  color,
  foregroundColor,
  title,
  items,
  position: {x = 0, y = 0, width: elementWidth = 0, height: elementHeight = 0},
  progress,
  onDismiss,
  open,
  scrollYOffset,
}) => {
  const [translationY, state, translateY] = useValues(
    [0, State.UNDETERMINED, 0],
    [],
  );
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const opacity = cond(greaterThan(progress, 0.05), 1, 0);
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

  return (
    <PanGestureHandler
      {...onGestureEvent({translationY, state})}
      enabled={open}>
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={[
          styles.container,
          {
            backgroundColor: color,
            left,
            top,
            width,
            height,
            opacity,
          },
        ]}>
        <View style={styles.indicator} />
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
});
