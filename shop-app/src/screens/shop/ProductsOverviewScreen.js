import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const products = useSelector((state) => state.productList.availableProducts);

  const loadProducts = useCallback(async () => {
    try {
      setError(null);
      setIsRefreshing(true);
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadProducts);

    return unsubscribe;
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts();
    setIsLoading(false);
  }, [loadProducts]);

  const handleSelectItem = (id, title) => {
    navigation.navigate({
      name: "ProductDetails",
      params: {
        id,
        title,
      },
    });
  };

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() =>
            handleSelectItem(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() =>
              handleSelectItem(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
