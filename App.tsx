import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "./components/Header";
import BottomTab from "./components/BottomTab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MeetView from "./components/MeetView";
import { height } from "./constants";

const Colors = {
  primaryBg: "#0f172a",
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={Colors.primaryBg}
        />
        <View style={{ height: height, flex: 1 }}>
          <Header />
          <View style={{ flex: 1 }}>
            <MeetView />
          </View>
          <View style={{ marginTop: "auto" }}>
            <BottomTab />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBg,
    // paddingTop: StatusBar.currentHeight,
  },
});
