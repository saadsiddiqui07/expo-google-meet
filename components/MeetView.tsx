import { Platform, StyleSheet, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { height, width } from "../constants";

const containerHeight = height * 0.7;

const MeetView = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onUpdate((event) => {
      if (event) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    })
    .onFinalize((event) => {
      if (
        event.translationY > containerHeight * 0.1 &&
        event.translationX > width * 0.1
      ) {
        // RIGHT BOTTOM
        translateY.value = withSpring(containerHeight * 0.4);
        translateX.value = withSpring(width * 0.25);
      } else if (
        event.translationY > containerHeight * 0.1 &&
        event.translationX < -width * 0.1
      ) {
        // LEFT BOTTOM
        translateY.value = withSpring(containerHeight * 0.4);
        translateX.value = withSpring(-width * 0.25);
      } else if (
        event.translationY < -containerHeight * 0.1 &&
        event.translationX > width * 0.1
      ) {
        // RIGHT TOP
        translateY.value = withSpring(-containerHeight * 0.3);
        translateX.value = withSpring(width * 0.3);
      } else if (
        event.translationY < -containerHeight * 0.1 &&
        event.translationX < -width * 0.1
      ) {
        // LEFT TOP
        translateY.value = withSpring(-containerHeight * 0.3);
        translateX.value = withSpring(-width * 0.3);
      } else {
        translateY.value = withSpring(containerHeight * 0.4);
        translateX.value = withSpring(width * 0.25);
      }
    })
    .shouldCancelWhenOutside(true);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGestureEvent}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 8,
          alignItems: "center",
          justifyContent: "center",
          height: containerHeight,
        }}
      >
        <Animated.View style={[styles.contact, animatedStyle]} />
      </View>
    </GestureDetector>
  );
};

export default MeetView;

const styles = StyleSheet.create({
  contact: {
    height: 180,
    width: 120,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
