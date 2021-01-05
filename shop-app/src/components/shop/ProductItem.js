import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";
import Card from "../ui/Card";

const ProductItem = ({ product, onSelect, children }) => {
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Card style={styles.container}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 20,
  },

  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "60%",
  },

  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },

  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
