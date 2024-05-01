import axios from 'axios';

export const fetchSubjects = () => async (dispatch) => {
  try {
    const response = await axios.get('/subjects');
    dispatch({ type: 'FETCH_SUBJECTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SUBJECTS_FAILURE', payload: error.message });
  }
};