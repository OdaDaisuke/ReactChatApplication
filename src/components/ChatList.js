import React from "react"

const ChatList = ({chats, currentOpponent, myId}) => (
  <div className="chat-conversation">
    <p>CHAT LEN : {chats.length}</p>
    {chats.map(_chat => {
      if(_chat.from_id === currentOpponent.uuid &&
        _chat.send_to === myId) {
        return (
          <div key={_chat.uuid} className="message message--receive">
            <span>@{_chat.from_id}</span>
            <p>{_chat.body}</p>
          </div>
        )

      } else if(_chat.from_id === myId &&
          _chat.send_to === currentOpponent.uuid) {
        return (
          <div key={_chat.uuid} className="message message--send">
            <p>{_chat.body}</p>
          </div>
        )

      } else {
        <div>CHATINFO : {_chat}</div>
      }

    })}
  </div>
)

export default ChatList
