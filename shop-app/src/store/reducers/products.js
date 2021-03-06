import PRODUCTS from "../../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export function productListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT: {
      const { products, userProducts } = action.payload;
      return {
        ...state,
        availableProducts: products,
        userProducts,
      };
    }
    case DELETE_PRODUCT: {
      const pid = action.payload.id;

      return {
        ...state,
        userProducts: state.userProducts.filter((prod) => prod.id !== pid),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== pid
        ),
      };
    }
    case CREATE_PRODUCT: {
      const {
        id,
        title,
        description,
        imageUrl,
        price,
        ownerId,
      } = action.payload;

      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );

      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    }
    case UPDATE_PRODUCT: {
      const { title, imageUrl, description } = action.payload.product;
      const pid = action.payload.id;

      const updatedUserProducts = [...state.userProducts];
      const updatedAvailableProducts = [...state.availableProducts];

      const productIndex = state.userProducts.findIndex(
        (pod) => pod.id === pid
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === pid
      );

      const updatedProduct = new Product(
        pid,
        state.userProducts[productIndex].ownerId,
        title,
        imageUrl,
        description,
        state.userProducts[productIndex].price
      );

      updatedUserProducts[productIndex] = updatedProduct;
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    }
    default:
      return state;
  }
}
