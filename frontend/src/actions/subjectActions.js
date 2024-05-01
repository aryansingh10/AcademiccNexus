import axios from 'axios';

export const FETCH_SUBJECTS_REQUEST = 'FETCH_SUBJECTS_REQUEST';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILURE = 'FETCH_SUBJECTS_FAILURE';

export const fetchSubjects = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SUBJECTS_REQUEST });

    try {
      const response = await axios.get('/api/subjects'); // Adjust the URL according to your API endpoint
      dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_SUBJECTS_FAILURE, payload: error.message });
    }
  };
};
