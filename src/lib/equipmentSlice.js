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
        assetId: obj.assetId,
        name: obj.name,
        detail: obj.detail,
        qty: obj.qty,
      };
      let index = state.data.findIndex((el) => el.name == obj.name);
      if (index < 0) {
        state.data.push(newItem);
      }
    },
    deleteEquipment: (state, action) => {
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
export const { addEquipment, deleteEquipment, deleteAll } =
  equipmentSlice.actions;
export default equipmentSlice.reducer;
