import * as actionTypes from "../constants/actionTypes"

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
  currentOpponent: 'uuid',
  chat: chatMold.chat,
  user: userMold.user,
  chats: [chatMold.chat],
  users: [userMold.user]
}

const chat = (state = initialAppState, action) => {
  switch(action.type) {
    case actionTypes.SUBMIT_MESSAGE :
      let uuid = generateUUID()

      return {
        ...state,
        message: '',
        chats: [...state.chats, {
          uuid: uuid,
          body: state.message
        }]
      }
      break

    case actionTypes.TYPING_MESSAGE :
      return {
        ...state,
        message: action.message
      }
      break

    case actionTypes.SELECT_USER :
      return {
        ...state,
        currentOpponent: action.uuid
      }

    default:
      return state

  }

}

function generateUUID() {
  const UUID_LENGTH = 40
  let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz';
  var uuid = '';

  for(var i = 0; i < character.length; i++) {
    var r = parseInt(Math.random() * character.length - 1)
    uuid += character[r]
  }

  return uuid

}

export default chat
