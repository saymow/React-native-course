import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../ui/Card";

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate}</Text>
      </View>
      {showDetails && (
        <View style={styles.detailItems}>
          {order.items.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </View>
      )}
      <Button
        color={Colors.primary}
        title={(showDetails ? "Hide" : "Show").concat(" details")}
        onPress={() => setShowDetails((prev) => !prev)}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },

  totalAmount: { fontFamily: "open-sans-bold", fontSize: 16 },

  date: { fontFamily: "open-sans-bold", fontSize: 16, color: "#888" },

  detailItems: { width: "100%", marginVertical: 10 },
});

export default OrderItem;
