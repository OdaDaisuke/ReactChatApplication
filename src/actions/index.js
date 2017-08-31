import * as actionTypes from '../constants/actionTypes';

export const onSubmitMessage = () => ({
  type: actionTypes.SUBMIT_MESSAGE,
})

export const onTypeMessage = (message) => ({
  type: actionTypes.TYPING_MESSAGE,
  message
})
