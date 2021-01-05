import React from "react";
import { FlatList, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productList.availableProducts);

  const handleSelectItem = (id, title) => {
    props.navigation.navigate({
      name: "ProductDetails",
      params: {
        id,
        title,
      },
    });
  };

  return (
    <FlatList
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

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
