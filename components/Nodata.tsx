import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import noDataAnim from "../assets/animations/nodata.json";

const NodataPage = () => {
 return (
    <View style={styles.container}>
      <LottieView
        source={noDataAnim} // 👈 apna file path daal
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.text}>No Tournaments Found</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    fontWeight: "500",
  },
});
export default NodataPage