import { createSlice } from "@reduxjs/toolkit";

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState: {
    data: [],
  },
  reducers: {
    addEquipment: (state, action) => {
      const obj = action.payload;
      const newItem = {
        id: state.data.length + 1,
        name: obj.asset.name,
        asset: obj.asset,
        qty: obj.qty,
      };
      let index = state.data.findIndex((el) => el.name == obj.asset.name);
      if (index < 0) {
        state.data.push(newItem);
      }
    },
    deleteEquipment: (state, action) => {
      console.dir(action.payload);
      const index = state.data.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
    deleteAll: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addEquipment, deleteEquipment, deleteAll } =
  equipmentSlice.actions;
export default equipmentSlice.reducer;
