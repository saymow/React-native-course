import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/ui/Card";
import Colors from "../../constants/Colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = () => {
  const dispatch = useDispatch();

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

  const handlePlaceOrder = () => {
    dispatch(addOrder(cartItems, total));
  };

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
