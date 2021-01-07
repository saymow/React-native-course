import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import { fetchOrders } from "../../store/actions/order";

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { orders } = useSelector((state) => state.order);

  const handleFetchOrders = async () => {
    setError(null);
    try {
      setIsLoading(true);
      await dispatch(fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribeFn = navigation.addListener("focus", handleFetchOrders);

    return unsubscribeFn;
  }, [dispatch]);

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text>Aan error ocurred</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={handleFetchOrders}
        />
      </View>
    );

  if (orders.length === 0)
    return (
      <View style={styles.centered}>
        <Text>You have no orders yet.</Text>
      </View>
    );

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem order={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default OrdersScreen;
