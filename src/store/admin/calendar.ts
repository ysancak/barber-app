import {CalendarViewMode} from '@howljs/calendar-kit';
import {createSlice} from '@reduxjs/toolkit';

interface State {
  mode: CalendarViewMode;
  unavailableHours:
    | {start: number; end: number}
    | {[key: string]: {start: number; end: number}}[];
  holidays: string[];
  startHour: number;
  endHour: number;
  worker?: Worker;
  events: Event[];
}

type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  worker: Worker;
};

const initialState: State = {
  mode: 'threeDays',
  unavailableHours: [],
  holidays: [],
  startHour: 6,
  endHour: 24,
  worker: undefined,
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleMode: state => {
      state.mode = state.mode === 'threeDays' ? 'day' : 'threeDays';
    },
  },
});

export const {toggleMode} = calendarSlice.actions;

export default calendarSlice.reducer;
