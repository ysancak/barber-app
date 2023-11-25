import CalendarLoading from './Calendar';
import ListLoading from './List';
import PopularSaloonsLoading from './PopularSaloons';
import SaloonDetailLoading from './SaloonDetail';

const SkeletonLoading = {
  PopularSaloons: PopularSaloonsLoading,
  SaloonDetail: SaloonDetailLoading,
  List: ListLoading,
  Calendar: CalendarLoading,
};

export default SkeletonLoading;
