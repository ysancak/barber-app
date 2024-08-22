import {useSelector} from 'react-redux';

const useAuth = <T extends 'User' | 'Admin'>(authTypeCheck: T) => {
  const {authType} = useSelector((state: any) => state.auth);
  const isAuthenticated = authType === authTypeCheck;
  return isAuthenticated;
};

export default useAuth;
