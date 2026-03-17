import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

// ประกาศ Type ของ State
interface BookState {
  bookItems: BookingItem[];
}

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
      // โค้ดเดิมของคุณ
    },
    removeBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
      // โค้ดเดิมของคุณ
    }
  }
});