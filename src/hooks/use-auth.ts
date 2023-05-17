import { useAppSelector } from "../Redux/store";

export const useAuth = () => {
  const {email,token,id} = useAppSelector(state => state.user)
  return {
    isAuth: !!window.localStorage.accessToken,
    email,
    token,
    id,
  }
}