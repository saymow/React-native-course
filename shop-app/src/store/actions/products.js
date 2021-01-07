import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products.json"
    );

    if (!response.ok) throw new Error("Something went wrong");

    const resData = await response.json();

    const loadedProducts = Object.keys(resData || {}).map(
      (key) =>
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
    );

    dispatch({ type: SET_PRODUCT, payload: { products: loadedProducts } });
  } catch (err) {
    //send to custom analytics server
    throw err;
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const options = {
    method: "DELETE",
  };

  const response = await fetch(
    `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products/${id}.json`,
    options
  );

  if (!response.ok) throw new Error("Something went wrong");

  dispatch({
    type: DELETE_PRODUCT,
    payload: {
      id,
    },
  });
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const product = {
      title,
      description,
      imageUrl,
      price,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    const response = await fetch(
      "https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products.json",
      options
    );

    const responseData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: { ...product, id: responseData.name },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch
) => {
  const updatedProduct = { title, description, imageUrl };

  const options = {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  };

  const response = await fetch(
    `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products/${id}.json`,
    options
  );

  if (!response.ok) throw new Error("Something went wrong");

  dispatch({
    type: UPDATE_PRODUCT,
    payload: {
      id,
      product: {
        title,
        description,
        imageUrl,
      },
    },
  });
};
