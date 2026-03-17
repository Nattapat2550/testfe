import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

interface BookState {
  bookItems: BookingItem[];
}

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
      // เพิ่มข้อมูลลงใน state
      state.bookItems.push(action.payload);
    },
    removeBooking: (state: BookState, action: PayloadAction<BookingItem>) => {
      // ตัวอย่างการลบข้อมูล (เอาข้อมูลที่ชื่อและวันที่ไม่ตรงกันไว้)
      state.bookItems = state.bookItems.filter(
        (item) => item.nameLastname !== action.payload.nameLastname || item.bookDate !== action.payload.bookDate
      );
    }
  }
});

// 1. ส่งออก Actions ให้ booking/page.tsx นำไปใช้ (แก้ Error 2305)
export const { addBooking, removeBooking } = bookSlice.actions;

// 2. ส่งออก Reducer เป็น Default ให้ store.ts นำไปใช้ (แก้ Error 2613)
export default bookSlice.reducer;