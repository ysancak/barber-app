import {CalendarViewMode} from '@howljs/calendar-kit';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface State {
  mode: CalendarViewMode;
  numOfDays: number;
  unavailableHours:
    | {start: number; end: number}
    | {[key: string]: {start: number; end: number}}[];
  holidays: string[];
  startHour: number;
  endHour: number;
  worker?: Worker;
  events: CalendarEvent[];
}

const initialState: State = {
  mode: 'threeDays',
  numOfDays: 3,
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
      state.numOfDays = state.numOfDays === 1 ? 3 : 1;
    },
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events = [...state.events, action.payload];
    },
    editEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(
        event => event.id === action.payload.id,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setWorker: (state, action: PayloadAction<Worker | undefined>) => {
      state.worker = action.payload;
    },
  },
});

export const {
  toggleMode,
  setEvents,
  setWorker,
  addEvent,
  editEvent,
  deleteEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;
