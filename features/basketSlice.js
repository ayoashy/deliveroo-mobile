import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBAsket(state, action) {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `can't remove productId (id: ${action.payload.id}) as it is not in basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBAsket, removeFromBasket } = basketSlice.actions;

// export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, items) => (total += items.price), 0);

export default basketSlice.reducer;
