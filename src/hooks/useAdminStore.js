import { useDispatch, useSelector } from "react-redux";
import { devitrackApiAdmin, devitrackApiPayment } from "../apis/devitrackApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/slices/adminSlice";

export const useAdminStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await devitrackApiAdmin.post("/login", { email, password });
      console.log({ data });

      localStorage.setItem("token", data.token);

      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {
      dispatch(onLogout("Incorrect credentials"));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    }
  };

  const startRegister = async ({ name, email, password }) => {

    dispatch( onChecking() )

    try {

      const { data } = await devitrackApiAdmin.post('/new_admin_user', { name, email, password})
      console.log( data )

      dispatch( onLogin({ name: data.name, uid: data.uid}))
      
    } catch (error) {

      dispatch(onLogout( error.response.data?.msg || '---'));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 1000);
    } 
    }

    const checkAdminToken = async () => {
      const token = localStorage.getItem('token')

      if (!token) return dispatch( onLogout() )

      try {
        
        const { data } = await devitrackApiAdmin.get('/renew');
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().getItem())
        dispatch( onLogin({ name: data.name, uid: data.uid }))


      } catch (error) {
        localStorage.clear()
        dispatch( onLogout() )
        
      }
    }

    const startLogout = () => {
      dispatch( onLogout() )
      localStorage.clear()  
    }

    const userRegitered = []

    const startLoadingUsers = () => {
      try {
        const { data } = devitrackApiPayment.get('/')
        userRegitered.push( data )
      } catch (error) {
        
      }
    }

  return {
    //*Propiedades
    status,
    user,
    errorMessage,
    userRegitered,

    //*Metodos
    startLogout,
    checkAdminToken,
    startLogin,
    startRegister,
    startLoadingUsers
  };
};
