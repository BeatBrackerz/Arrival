import React from 'react';
import {SupabaseContext} from '../context';

export const useSupabase = () => React.useContext(SupabaseContext);

export default useSupabase;
