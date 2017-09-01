import * as actionTypes from "../constants/actionTypes"
import funcs from "../functions"

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
    handleName: "handle_name",
    created: "timestamp",
    uuid: "abcdefg"
  }
}

const initialAppState = {
  message: '',
  sending: false,
  typing: false,
  myId: 'myuuid',
  chat: chatMold.chat,
  currentOpponent: userMold.user,
  user: userMold.user,
  chats: [chatMold.chat],
  users: [userMold.user]
}

const chat = (state = initialAppState, action) => {
  switch(action.type) {
    case actionTypes.SENDING_MESSAGE :
      if(state.message.length < 1) return state
      
      let uuid = funcs.generateUUID()

      return {
        ...state,
        message: '',
        chats: [...state.chats, {
          uuid: uuid,
          from_id: state.myId,
          send_to: state.currentOpponent.uuid,
          body: state.message
        }]
      }

    case actionTypes.TYPING_MESSAGE :
      return {
        ...state,
        message: action.message
      }

    case actionTypes.SELECT_USER :
      /* actionで「uuid」が渡されるので概要ユーザのオブジェクトを
       * 取得してcurrentOpponentにセット
       */
      let opponentUser = null;

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

    default:
      return state

  }

}

export default chat
