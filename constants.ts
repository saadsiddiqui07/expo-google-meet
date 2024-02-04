import { Dimensions } from "react-native";

// right bottom --> X = w * 0.25, Y = h * 0.25       // right top --> X = w * 0.25, Y = -h * 0.25
// left bottom --> X = -w * 0.25, Y = h * 0.25   // top left --> X = -w * 0.25, Y = -h * 0.25

const { width, height } = Dimensions.get("screen");

export { width, height };
