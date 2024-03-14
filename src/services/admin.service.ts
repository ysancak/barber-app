import api from './api';

import {showAPIErrorToast} from '@/utils/toast';

export const loginAdminService = async (params: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post<AuthResponse>('/admin-signin', params);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminBusinessDetailService = async () => {
  try {
    const response = await api.get<Saloon>('/getBusiness');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetWorkersService = async () => {
  try {
    const response = await api.get<Worker[]>('/allWorkers');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminCreateWorkerService = async (worker: Worker) => {
  try {
    const response = await api.post<Worker>('/save-worker', worker);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminEditWorkerService = async (params: {
  worker: Worker;
  workerID: string;
}) => {
  try {
    const response = await api.post<Worker>(
      `/edit-worker/${params.workerID}`,
      params.worker,
    );
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminDeleteWorkerService = async (workerID: string) => {
  try {
    const response = await api.post(`/delete-worker/${workerID}`);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetUpcomingDayOffsService = async () => {
  try {
    const response = await api.get<WorkerDayOff[]>('/upcomingHolidays');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminCreateDayOffService = async (dayoff: WorkerDayOff) => {
  try {
    const response = await api.post<WorkerDayOff>('/save-holiday', dayoff);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminDeleteDayOffService = async (dayOffId: string) => {
  try {
    const response = await api.post(`/delete-holiday/${dayOffId}`);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminEditDayOffService = async (params: {
  dayOff: WorkerDayOff;
  dayOffId: string;
}) => {
  try {
    const response = await api.post<WorkerDayOff>(
      `/edit-holiday/${params.dayOffId}`,
      params.dayOff,
    );
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetPastDayOffsService = async () => {
  try {
    const response = await api.get<WorkerDayOff[]>('/pastHolidays');
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminCreateCalendarEventService = async (event: any) => {
  try {
    const response = await api.post('/save-event', event);
    return response.data;
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};

export const adminGetCelandarEventService = async (
  dates: {
    startDate: string;
    endDate: string;
  },
  workerID?: string,
) => {
  try {
    let url = `/get-calendar-data-worker-app/${dates.startDate}/${dates.endDate}`;
    if (workerID) {
      url += `?workerID=${workerID}`;
    }
    const response = await api.get<CalendarEvent[]>(url);
    // TODO: burayı servise bağla
    return [
      {
        id: '2',
        title: 'Renkli Saç Boyama',
        start: '2024-03-14T14:00:00.000Z',
        end: '2024-03-14T15:30:00.000Z',
        color: 'orange',
        worker: {
          _id: '34',
          name: 'Alex',
          surname: 'Johnson',
          fullName: 'Alex Johnson',
          availability: 'Available',
          businessID: '789',
          workerColor: 'orange',
        },
        clientTel: '1234567890',
        customerName: 'Jamie',
        customerSurname: 'Doe',
        startHour: '10:00',
        endHour: '11:30',
      },
    ];
  } catch (error) {
    showAPIErrorToast(error);
    throw error;
  }
};
