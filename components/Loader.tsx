import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import loader from "../assets/animations/loader.json";

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={loader}
        autoPlay
        loop
        style={{ width: 450, height: 450 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 999,
  },
});

export default Loader;
