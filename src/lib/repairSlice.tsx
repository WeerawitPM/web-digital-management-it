import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RepairItem {
  id: number;
  asset: string;
  detail: string;
}

interface RepairState {
  data: RepairItem[];
}

interface AddRepairPayload {
  asset: string;
  detail: string;
}

interface DeleteRepairPayload {
  id: number;
}

const initialState: RepairState = {
  data: [],
};

export const repairSlice = createSlice({
  name: "repair",
  initialState,
  reducers: {
    addRepair: (state, action: PayloadAction<AddRepairPayload>) => {
      const { asset, detail } = action.payload;
      const newItem: RepairItem = {
        id: state.data.length + 1,
        asset,
        detail,
      };
      state.data.push(newItem);
    },
    deleteRepair: (state, action: PayloadAction<DeleteRepairPayload>) => {
      const { id } = action.payload;
      const index = state.data.findIndex(item => item.id === id);
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

export const { addRepair, deleteRepair, deleteAll } = repairSlice.actions;
export default repairSlice.reducer;
