import { configureStore } from '@reduxjs/toolkit';

import settings from "../context/settingsReducer";
import counter from "../context/counterReducer";

export default configureStore({
  reducer: {
    settings: settings,
    counter: counter,
  },
});
