const initialState = {
  data: {},
  error: null,
  isLoaded: false,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_START':
      return {
        ...state,
        isLoaded: true,
      };
    case 'SET_DATA_SUCCESS':
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        isLoaded: true,
      };
    case 'SET_DATA_FAILED':
      return {
        ...state,
        isLoaded: false,
      };
    default:
      return state;
  }
};

export default data;
