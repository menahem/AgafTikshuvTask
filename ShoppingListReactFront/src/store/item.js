import { createSlice } from "@reduxjs/toolkit";

const GenerateNextId = (() => {
  let id = 0;
  return () => {
    console.log("id", id);
    return id++;
  };
})();

const categorySlice = createSlice({
  name: "categoryWidget",
  initialState: {
    categories: [],
    categoryId: null,
    categoryName: "",
  },
  reducers: {
    addItem: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category.categoryId === action.payload.categoryId
      );
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].items.push({
          ...action.payload.item,
          id: GenerateNextId(),
        });
        return;
      }
      state.categories.push({
        categoryId: action.payload.categoryId,
        categoryName: action.payload.categoryName,
        items: [{ ...action.payload.item, id: GenerateNextId() }],
      });
    },
    increment: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category.categoryId === action.payload.categoryId
      );

      const itemIndex = state.categories[categoryIndex].items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      state.categories[categoryIndex].items[itemIndex].quantity += 1;
    },
    decrement: (state, action) => {
      const categoryIndex = state.categories.findIndex(
        (category) => category.categoryId === action.payload.categoryId
      );

      const itemIndex = state.categories[categoryIndex].items.findIndex(
        (item) => item.id === action.payload.itemId
      );

      if (state.categories[categoryIndex].items[itemIndex].quantity < 1) {
        return;
      }
      state.categories[categoryIndex].items[itemIndex].quantity -= 1;
    },
  },
});

export const { addItem, increment, decrement } = categorySlice.actions;
export default categorySlice.reducer;
