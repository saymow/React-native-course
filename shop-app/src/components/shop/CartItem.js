import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ product, onRemove }) => {
  let TouchableCmp =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.container}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>
          {product.quantity}x{"  "}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {product.productTitle}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.price}>
          ${product.productPrice.toFixed(2)} {"   "}
        </Text>
        {onRemove && (
          <TouchableCmp onPress={onRemove}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },

  quantity: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },

  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    width: "60%",
  },

  price: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },

  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
