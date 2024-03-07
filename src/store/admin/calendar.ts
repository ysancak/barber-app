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
  numOfDays: 3,
  unavailableHours: [],
  holidays: [],
  startHour: 6,
  endHour: 24,
  worker: {
    _id: '65e9d347db0586c12cf2dc0f',
    availability: 'Available',
    businessID: '65b91b125b38e55f57a6fe35',
    fullName: 'ab b',
    hours: [],
    name: 'ab',
    surname: 'b',
    workerColor: '#59f151',
  },
  events: [
    {
      id: '1',
      title: 'SAç kesimi',
      start: '2024-03-07T13:00:05.313Z',
      end: '2024-03-07T14:00:05.313Z',
      color: 'orange',
      worker: {
        _id: '1',
        fullName: 'Yusuf SAncak',
        name: 'Yusuf',
        surname: 'SAncak',
        workerColor: 'orange',
      },
    },
    {
      id: '2',
      title: 'SAç kesimi',
      start: '2024-03-07T13:00:05.313Z',
      end: '2024-03-07T14:00:05.313Z',
      color: 'red',
      worker: {
        _id: '1',
        fullName: 'Yusuf SAncak',
        name: 'Yusuf',
        surname: 'SAncak',
        workerColor: 'orange',
      },
    },
  ],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    toggleMode: state => {
      state.mode = state.mode === 'threeDays' ? 'day' : 'threeDays';
      state.numOfDays = state.mode === 'threeDays' ? 1 : 3;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events = [...state.events, action.payload];
    },
  },
});

export const {toggleMode, addEvent} = calendarSlice.actions;

export default calendarSlice.reducer;
