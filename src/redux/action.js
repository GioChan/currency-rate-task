import axios from 'axios';

export const setDataFromApiSuccess = (data) => ({
  type: 'SET_DATA_SUCCESS',
  payload: data,
});

export const setDataFromApiStart = () => ({
  type: 'SET_DATA_START',
});

export const setDataFromApiFailed = () => ({
  type: 'SET_DATA_FAILED',
});

export const fetchCurrencyRate = () => {
  return (dispatch) => {
    dispatch(setDataFromApiStart());

    axios
      .get('https://api.exchangeratesapi.io/latest?base=USD')
      .then((res) => {
        dispatch(setDataFromApiSuccess(res.data.rates));
      })
      .catch((err) => {
        dispatch(setDataFromApiFailed);
      });
  };
};
