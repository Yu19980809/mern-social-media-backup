import * as api from '../api';
import { AUTH } from '../constants/actionType';

const signUp = ( formData, navigate ) => async ( dispatch ) => {
  try {
    const { data } = await api.signUp( formData );
    dispatch( { type: AUTH, payload: data } );
    navigate( '/' );
  } catch (error) {
    console.log( error );
  }
}

const signIn = ( formData, navigate ) => async ( dispatch ) => {
  try {
    const { data } = await api.signIn( formData );
    dispatch( { type: AUTH, payload: data } );
    navigate( '/' );
  } catch (error) {
    console.log( error );
  }
}

export { signUp, signIn };
