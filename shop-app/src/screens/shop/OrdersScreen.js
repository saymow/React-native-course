import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem order={itemData.item} />}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
