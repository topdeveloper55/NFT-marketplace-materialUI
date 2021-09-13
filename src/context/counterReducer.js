import { createSlice } from '@reduxjs/toolkit';

export const counter = createSlice({
  name: 'counter',
  initialState: [],
  reducers: {
    concatinate(state, action) {
      action.payload.map( asset => {
        return state.push(asset);
      })
    }
  },
});

export const { concatinate } = counter.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getAssets = state => state.counter;

export default counter.reducer;