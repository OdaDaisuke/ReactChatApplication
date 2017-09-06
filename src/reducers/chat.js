import * as actionTypes from "../constants/actionTypes"
import funcs from "../functions"
import $ from "jquery"
import io from 'socket.io-client'

const socket = io()

let chatMold = {
  chat: {
    uuid: 'メッセージ固有のuuid',
    created: 'timestamp',
    body: 'max 500chars',
    from_id: '送りもとユーザのuuid',
    send_to: '送り先ユーザのuuid'
  }
}

let userMold = {
  user: {
    screenname: "表示　名前",
    profileUrl: 'image url',
    handle_name: "handle_name",
    created: "timestamp",
    uuid: "abcdefg" //ハンドルネームが変更されても識別できるようにするためuuidが必要
  }
}

const initialAppState = {
  message: '',
  sending: false,
  typing: false,
  myId: 'daisukeoda98343242', //uuid
  currentOpponent: userMold.user, //選択中の相手
  user: userMold.user,
  chat: chatMold.chat,
  chats: [chatMold.chat],
  users: [userMold.user]
}

const chatReducer = (state = initialAppState, action) => {
  switch(action.type) {
    case actionTypes.SET_MESSAGE_INFO :
      if(state.message.length < 1) return state

      let uuid = funcs.generateUUID()
      let chat = {
        uuid: uuid,
        created: new Date().getTime(),
        from_id: state.myId,
        send_to: state.currentOpponent.uuid,
        body: state.message,
      }

      socket.emit('send_message', JSON.stringify(chat))

      return {
        ...state,
        chat: chat,
      }

    case actionTypes.SENDING_MESSAGE :
      let _chat = state.chat

      return {
        ...state,
        message: '',
        chats: [...state.chats, _chat]
      }

    case actionTypes.INITIAL_MESSAGE :
      return {
        ...state,
        chats: action.chats
      }

    case actionTypes.TYPING_MESSAGE :
      return {
        ...state,
        message: action.message
      }

    case actionTypes.SELECT_USER :
      /* actionで「uuid」が渡されるので該当ユーザのオブジェクトを
       * 取得してcurrentOpponentにセット
       */
      let opponentUser = null

      for(let i = 0; i < state.users.length; ++i) {
        let user = state.users[i]
        if(user.uuid === action.uuid) {
          opponentUser = user
          break;
        }
      }

      return {
        ...state,
        currentOpponent: opponentUser
      }

    case actionTypes.DELETE_ALL_MESSAGE :
      return {
        ...state,
        chats: []
      }

    case actionTypes.SELECT_ME :
      return {
        ...state,
        myId: action.uuid
      }


    default:
      return state

  }

}

export default chatReducer
