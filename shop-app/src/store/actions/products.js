import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;

    const response = await fetch(
      "https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products.json"
    );

    if (!response.ok) throw new Error("Something went wrong");

    const resData = await response.json();

    const loadedProducts = Object.keys(resData || {}).map(
      (key) =>
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
    );

    dispatch({
      type: SET_PRODUCT,
      payload: {
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      },
    });
  } catch (err) {
    //send to custom analytics server
    throw err;
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const options = {
    method: "DELETE",
  };

  const token = getState().auth.token;

  const response = await fetch(
    `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
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
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;

    const product = {
      title,
      description,
      imageUrl,
      price,
      ownerId: userId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    const response = await fetch(
      `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products.json?auth=${token}`,
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
  dispatch,
  getState
) => {
  const updatedProduct = { title, description, imageUrl };

  const token = getState().auth.token;

  const options = {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  };

  const response = await fetch(
    `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
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
