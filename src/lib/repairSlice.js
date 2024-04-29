import { createSlice } from "@reduxjs/toolkit";

export const repairSlice = createSlice({
  name: "repair",
  initialState: {
    data: [],
  },
  reducers: {
    addRepair: (state, action) => {
      const obj = action.payload;
      const newItem = {
        id: state.data.length + 1,
        asset: obj.asset,
        detail: obj.detail,
      };
      let index = state.data.findIndex((el) => el.asset == obj.asset);
      if (index < 0) {
        state.data.push(newItem);
      }
    },
    deleteRepair: (state, action) => {
      const obj = action.payload;
      const index = state.data.findIndex((item) => item.id === obj.id);
      if (index !== -1) {
        state.data.splice(index, 1);

        state.data = state.data.map((item, idx) => {
          return {
            ...item,
            id: idx + 1 // สร้าง index ใหม่ให้กับไอเท็ม
          };
        });
      }
    },
    deleteAll: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRepair, deleteRepair, deleteAll } =
  repairSlice.actions;
export default repairSlice.reducer;
