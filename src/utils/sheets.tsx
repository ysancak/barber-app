import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';

import EventActionModal from '@/pages/Admin/Calendar/components/EventActionModal';
registerSheet('admin_calendar_event_action', EventActionModal);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    admin_calendar_event_action: SheetDefinition<{
      payload: {
        event: CalendarEvent;
        navigation: any;
      };
    }>;
  }
}
