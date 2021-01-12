import Place from "../models/place";
import { ADD_PLACE, SET_PLACES } from "./places-actions";

const initialState = {
  places: [],
};

const placeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const { id, title, image, address, coords } = action.payload;
      const newPlace = new Place(
        id.toString(),
        title,
        image,
        address,
        coords.lat,
        coords.lon
      );

      return { ...state, places: [...state.places, newPlace] };
    }
    case SET_PLACES: {
      const serializedPlaces = action.payload.places.map(
        (pl) =>
          new Place(
            pl.id.toString(),
            pl.title,
            pl.imageUri,
            pl.address,
            pl.lat,
            pl.lon
          )
      );
      return { ...state, places: serializedPlaces };
    }
    default:
      return state;
  }
};

export default placeListReducer;
