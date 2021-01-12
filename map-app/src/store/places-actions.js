import * as Fs from "expo-file-system";
import env from "../../env";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => async (dispatch) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lon}&key=${env.googleApiKey}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await response.json();

  const address =
    resData.status === "REQUEST_DENIED"
      ? "Static address"
      : resData.results[0].formatted_address;

  const fileName = image.split("/").pop();
  const newPath = Fs.documentDirectory + fileName;

  try {
    await Fs.moveAsync({
      from: image,
      to: newPath,
    });

    const dbResult = await insertPlace(
      title,
      newPath,
      address,
      location.lat,
      location.lon
    );

    dispatch({
      type: ADD_PLACE,
      payload: {
        id: dbResult.insertId,
        title,
        image: newPath,
        address,
        coords: {
          lat: location.lat,
          lon: location.lon,
        },
      },
    });
  } catch (err) {
    console.err(err);
    throw err;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const dbResult = await fetchPlaces();

    console.log(dbResult);

    dispatch({ type: SET_PLACES, payload: { places: dbResult.rows._array } });
  } catch (err) {
    throw err;
  }
};
