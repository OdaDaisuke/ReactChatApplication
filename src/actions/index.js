import * as actionTypes from '../constants/actionTypes';

export const onSubmitMessage = () => ({
  type: actionTypes.SENDING_MESSAGE,
})

export const onTypeMessage = (message) => ({
  type: actionTypes.TYPING_MESSAGE,
  message
})

export const onSelectUser = (uuid) => ({
  type: actionTypes.SELECT_USER,
  uuid
})

export const onInitialMessages = (chats) => ({
  type: actionTypes.INITIAL_MESSAGE,
  chats
})
