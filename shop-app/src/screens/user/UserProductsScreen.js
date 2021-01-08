import React from "react";
import { StyleSheet, FlatList, Button, Alert, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import * as ProductsActions from "../../store/actions/products";

import ProductItem from "../../components/shop/ProductItem";

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userProducts } = useSelector((state) => state.productList);

  const handleEditProduct = (id) => {
    navigation.navigate({ name: "UserEditProducts", params: { id } });
  };

  const handleDeleteProduct = (id) => {
    Alert.alert("Are you sure?", "Dou you really wanna delete this item?", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(ProductsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0)
    return (
      <View style={styles.centered}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => handleEditProduct(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => handleEditProduct(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => handleDeleteProduct(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default UserProductsScreen;
