import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = '/api/v1/bills'; 

// Async Thunks

export const fetchAllBills = createAsyncThunk(
  'recurringBills/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/showAllBills`,{
        withCredentials:true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createBill = createAsyncThunk(
  'recurringBills/create',
  async (billData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/createBill`, billData,{
        withCredentials:true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateBill = createAsyncThunk(
  'recurringBills/update',
  async (billData, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/updateBill`, billData,{
        withCredentials : true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBill = createAsyncThunk(
  'recurringBills/delete',
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${API}/deleteBill`, { data: { id } },{
        withCredentials: true,
      });
      return id; // return id so we can remove from local state
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getBillById = createAsyncThunk(
  'recurringBills/getById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/getBillid`, { data: { id } },{
        withCredentials : true
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Slice

const recurringBillsSlice = createSlice({
  name: 'recurringBills',
  initialState: {
    bills: [],
    currentBill: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentBill: (state) => {
      state.currentBill = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.bills || [];
      })
      .addCase(fetchAllBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(createBill.fulfilled, (state, action) => {
        state.bills.push(action.payload);
      })
      .addCase(updateBill.fulfilled, (state, action) => {
        const idx = state.bills.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.bills[idx] = action.payload;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.bills = state.bills.filter((b) => b._id !== action.payload);
      })
      .addCase(getBillById.fulfilled, (state, action) => {
        state.currentBill = action.payload;
      });
  },
});

export const { clearCurrentBill } = recurringBillsSlice.actions;
export default recurringBillsSlice.reducer;
