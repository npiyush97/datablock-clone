import { createSlice } from '@reduxjs/toolkit';

interface BlockModalInitialState {
  isOpen: boolean;
}

const initialState: BlockModalInitialState = {
  isOpen: false
};

export const blockModalSlice = createSlice({
  name: 'blockModa',
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    }
  }
});

export const { onOpen, onClose } = blockModalSlice.actions;

export default blockModalSlice.reducer;
