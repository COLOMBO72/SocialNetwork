import { useAppSelector } from "../Redux/store";

export const useAuth = () => {
  const {token} = useAppSelector(state => state.user)
  return {
    isAuth: !!token,
  }
}