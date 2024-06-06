import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EquipmentItem {
  id: number;
  assetId: string;
  name: string;
  purpose: string;
  detail: string;
  qty: number;
}

interface EquipmentState {
  data: EquipmentItem[];
}

interface AddEquipmentPayload {
  assetId: string;
  name: string;
  purpose: string;
  detail: string;
  qty: number;
}

interface DeleteEquipmentPayload {
  id: number;
}

const initialState: EquipmentState = {
  data: [],
};

export const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    addEquipment: (state, action: PayloadAction<AddEquipmentPayload>) => {
      const { assetId, name, purpose, detail, qty } = action.payload;
      const newItem: EquipmentItem = {
        id: state.data.length + 1,
        assetId,
        name,
        purpose,
        detail,
        qty,
      };
      const index = state.data.findIndex((el) => el.name === name);
      if (index < 0) {
        state.data.push(newItem);
      }
    },
    deleteEquipment: (state, action: PayloadAction<DeleteEquipmentPayload>) => {
      const { id } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
        // Reassign IDs to maintain a consistent sequence
        state.data = state.data.map((item, idx) => ({
          ...item,
          id: idx + 1,
        }));
      }
    },
    deleteAll: (state) => {
      state.data = [];
    },
  },
});

export const { addEquipment, deleteEquipment, deleteAll } = equipmentSlice.actions;
export default equipmentSlice.reducer;
