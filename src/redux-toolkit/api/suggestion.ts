import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/api/user/user.service';

const getUserSuggestions = createAsyncThunk(
  'user/getSuggestions',
  async (/* name, { dispatch } */) => {
    try {
      const response = await userService.getUserSuggestions();
      return response.data;
    } catch (error) {
      console.log('Utils.dispatchNotification goes here');
    }
  }
);

export { getUserSuggestions };
