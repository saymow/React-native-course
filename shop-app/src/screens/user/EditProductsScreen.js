import React, { useCallback, useEffect, useReducer } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/ui/Input";
import * as productActions from "../../store/actions/products";

const UPDATE_FORM_INPUT = "UPDATE_FORM_INPUT";

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM_INPUT: {
      const { name, text, isValid } = action.payload;
      const newValues = {
        ...state.values,
        [name]: { text, isValid },
      };
      const formIsValid = Object.keys(newValues).every(
        (key) => newValues[key].isValid
      );

      return {
        ...state,
        isValid: formIsValid,
        values: newValues,
      };
    }
    default:
      return state;
  }
};

const EditProductsScreen = ({ route, navigation }) => {
  const pid = route?.params?.id;

  const editedProduct = useSelector((state) =>
    state.productList.userProducts.find((prod) => prod.id === pid)
  );

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    values: {
      title: {
        text: editedProduct ? editedProduct.title : "",
        isValid: editedProduct ? true : false,
      },
      imageUrl: {
        text: editedProduct ? editedProduct.imageUrl : "",
        isValid: editedProduct ? true : false,
      },
      description: {
        text: editedProduct ? editedProduct.description : "",
        isValid: editedProduct ? true : false,
      },
      price: {
        text: "",
        isValid: editedProduct ? true : false,
      },
    },
    isValid: editedProduct ? true : false,
  });

  const handleSubmit = useCallback(() => {
    if (!formState.isValid) {
      return Alert.alert(
        "Wrong input!",
        "Please check the errors in the form!",
        [{ text: "Okay" }]
      );
    }

    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          pid,
          formState.values.title.text,
          formState.values.description.text,
          formState.values.imageUrl.text
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.values.title.text,
          formState.values.description.text,
          formState.values.imageUrl.text,
          Number(formState.values.price.text)
        )
      );
    }

    navigation.goBack();
  }, [pid, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  const handleInputChange = useCallback(
    (name, text, isValid) => {
      formDispatch({
        type: UPDATE_FORM_INPUT,
        payload: { name, text, isValid },
      });
    },
    [formDispatch]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValid={!!editedProduct}
            required
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            autoCorrect
          />

          <Input
            id="imageUrl"
            label="ImageURL"
            errorText="Please enter a valid imageURL"
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initialValid={!!editedProduct}
            onInputChange={handleInputChange}
            required
            keyboardType="default"
            returnKeyType="next"
          />

          {!editedProduct && (
            <Input
              id="price"
              label="Price"
              onInputChange={handleInputChange}
              errorText="Please enter a valid price"
              required
              keyboardType="numeric"
              returnKeyType="next"
            />
          )}

          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValid={!!editedProduct}
            onInputChange={handleInputChange}
            required
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 20,
  },
});

export default EditProductsScreen;
