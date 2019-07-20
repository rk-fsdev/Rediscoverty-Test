export const SET_CURR_TOOL = 'SET_CURR_TOOL';
export const SET_CROPS = 'SET_CROPS';

export const setCurrTool = payload => ({
  type: SET_CURR_TOOL,
  payload
});

export const setCrops = payload => ({
  type: SET_CROPS,
  payload
});
