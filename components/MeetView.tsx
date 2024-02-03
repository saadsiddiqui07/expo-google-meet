import { StyleSheet, View } from "react-native";
import React from "react";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { height, width } from "../constants";

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
      // right bottom --> X = w * 0.25, Y = h * 0.25       // right top --> X = w * 0.25, Y = -h * 0.25
      // left bottom --> X = -w * 0.25, Y = h * 0.25   // top left --> X = -w * 0.25, Y = -h * 0.25
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

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
          height: height * 0.7,
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
