import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
    .onEnd(() => {
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
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 8,
          alignItems: "center",
          justifyContent: "center",
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
    height: 150,
    width: 150,
    backgroundColor: "royalblue",
    borderRadius: 20,
  },
});
