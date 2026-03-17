// src/redux/features/bookSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      // ตรวจสอบว่ามีสถานที่และวันที่ตรงกันอยู่แล้วหรือไม่
      const existingIndex = state.bookItems.findIndex(
        (item) =>
          item.venue === action.payload.venue &&
          item.bookDate === action.payload.bookDate
      );

      if (existingIndex !== -1) {
        // แทนที่ข้อมูลการจองเดิม
        state.bookItems[existingIndex] = action.payload;
      } else {
        // เพิ่มข้อมูลการจองใหม่
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      // ลบข้อมูลโดยเช็คให้ตรงกันทุก field
      state.bookItems = state.bookItems.filter(
        (item) =>
          item.nameLastname !== action.payload.nameLastname ||
          item.tel !== action.payload.tel ||
          item.venue !== action.payload.venue ||
          item.bookDate !== action.payload.bookDate
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;