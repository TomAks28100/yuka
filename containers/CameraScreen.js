import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import ShadowScreen from "../components/ShadowScreen";

const CameraScreen = props => {
  const [scannedCode, setScannedCode] = useState("");
  const [product, setProduct] = useState({});
  console.log(product);

  useEffect(() => {
    if (scannedCode) {
      const fetchData = async () => {
        try {
          const response = await axios.get(props.apiUrl + scannedCode);
          if (response) {
            setProduct(
              // { ...product },
              {
                name: response.data.product.product_name,
                nutriscore: response.data.product.nutriscore_grade,
                allergens: response.data.product.allergens_tags
              }
            );
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }
  }, [scannedCode]);

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={code => {
          if (scannedCode !== code.data) {
            setScannedCode(code.data);
          }
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <ShadowScreen />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative"
  }
});
