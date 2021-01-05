import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProductsScreen = ({ route, navigation }) => {
  const pid = route?.params?.id;

  const editedProduct = useSelector((state) =>
    state.productList.userProducts.find((prod) => prod.id === pid)
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: editedProduct ? editedProduct.title : "",
    imageUrl: editedProduct ? editedProduct.imageUrl : "",
    price: "",
    description: editedProduct ? editedProduct.description : "",
  });

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          pid,
          formData.title,
          formData.description,
          formData.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formData.title,
          formData.description,
          formData.imageUrl,
          Number(formData.price)
        )
      );
    }

    navigation.goBack();
  }, [formData.title, formData.description, formData.imageUrl, formData.price]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={formData.imageUrl}
            onChangeText={(text) => handleInputChange("imageUrl", text)}
          />
        </View>

        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={(text) => handleInputChange("price", text)}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

  formControl: {
    width: "100%",
  },

  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductsScreen;
