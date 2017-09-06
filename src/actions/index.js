import * as actionTypes from '../constants/actionTypes';

// メッセージ情報をサーバに送信
export const onSubmitMessage = () => ({
  type: actionTypes.SENDING_MESSAGE,
})

// メッセージ情報セット
export const onSetMessageInfo = () => ({
  type: actionTypes.SET_MESSAGE_INFO,
})

// メッセージタイピング時
export const onTypeMessage = (message) => ({
  type: actionTypes.TYPING_MESSAGE,
  message
})

// ユーザ選択時
export const onSelectUser = (uuid) => ({
  type: actionTypes.SELECT_USER,
  uuid
})

// ページロードジのメッセージ取得
export const onInitialMessages = (chats) => ({
  type: actionTypes.INITIAL_MESSAGE,
  chats
})

/**
 * Develop用
 */

// ログイン主ユーザを選択時
export const onSelectMe = (uuid) => ({
  type: actionTypes.SELECT_ME,
  uuid
})

// 全メッセージ削除
export const onDeleteAllMessage = () => ({
  type: actionTypes.DELETE_ALL_MESSAGE
})
