import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART } from "../actions/cart";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.payload.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const productInCart = state.items[addedProduct.id];
      let updatedOrNewCartItem;

      if (productInCart) {
        updatedOrNewCartItem = new CartItem(
          productInCart.quantity + 1,
          prodPrice,
          prodTitle,
          productInCart.sum + prodPrice
        );
      } else
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + prodPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const id = action.payload.id;
      const productToBeRemoved = state.items[id];
      let newItems = { ...state.items };

      if (productToBeRemoved.quantity === 1) delete newItems[id];
      else {
        newItems[id] = new CartItem(
          productToBeRemoved.quantity - 1,
          productToBeRemoved.productPrice,
          productToBeRemoved.productTitle,
          productToBeRemoved.sum - productToBeRemoved.price
        );
      }

      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount - productToBeRemoved.productPrice,
      };
    }
    case RESET_CART:
      return initialState;

    case DELETE_PRODUCT: {
      const pid = action.payload.id;

      if (!state.items[pid]) return state;

      const updatedItems = { ...state.items };
      const itemTotal = state.items[pid].sum;
      delete updatedItems[pid];

      return {
        ...state,
        items: {},
        totalAmount: state.totalAmount - itemTotal,
      };
    }
    default:
      return state;
  }
};
