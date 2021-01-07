import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/ui/Card";
import Colors from "../../constants/Colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) =>
    Object.keys(state.cart.items)
      .map((key) => ({
        id: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        summary: state.cart.items[key].sum,
      }))
      .sort((a, b) => a.id - b.id)
  );

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(addOrder(cartItems, total));
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Something went wrong</Text>
        <Button title="Try again" onPress={handlePlaceOrder} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round((total.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          disabled={cartItems.length === 0}
          title="Order now"
          onPress={handlePlaceOrder}
        />
      </Card>
      <FlatList
        data={cartItems}
        renderItem={(itemData) => (
          <CartItem
            product={itemData.item}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.id));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },

  summaryText: {
    fontFamily: "open-sans",
    fontSize: 18,
  },

  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
