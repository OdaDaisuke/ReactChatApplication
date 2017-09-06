import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import $ from "jquery"
import io from 'socket.io-client'

import * as actions from "../actions"
import UsersSidebar from "../components/UsersSidebar"

class ChatContainer extends Component {

  constructor() {
    super()
    this.sendMessage = this.sendMessage.bind(this)
  }

  render() {
    const { chat, actions } = this.props

    return (
      <section className="content--main">
        <UsersSidebar selectedUserId={chat.currentOpponent.uuid} onSelectUser={actions.onSelectUser} users={chat.users} />
        <div className="chat-area">
          <div className="chat-conversation">
            {chat.chats.map(_chat => {
              if(_chat.from_id === chat.currentOpponent.uuid &&
                _chat.send_to === chat.myId) {
                return (
                  <div key={_chat.uuid} className="message message--receive">
                    <span>@{_chat.from_id}</span>
                    <p>{_chat.body}</p>
                  </div>
                )

              } else if(_chat.from_id === chat.myId &&
                  _chat.send_to === chat.currentOpponent.uuid) {
                return (
                  <div key={_chat.uuid} className="message message--send">
                    <p>{_chat.body}</p>
                  </div>
                )

              }
            })}
          </div>
          <div className="chat-form">
            <textarea placeholder="内容を入力" value={chat.message} onChange={e => actions.onTypeMessage(e.target.value)}></textarea>
            <button onClick={this.sendMessage}>送信</button>
          </div>
        </div>
      </section>
    )

  }

  componentWillMount() {
    //　新規メッセージをキャッチするリスナー処理
    // this.startMessageListener()

    this.loadUsersFromServer()

    this.props.chat.currentOpponent = {
      screenname: "田中二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "ziro_name",
      created: "timestamp",
      uuid: "zirodesu"
    }

  }

  componentDidMount() {
    this.getInitialMessage()
  }

  sendMessage() {
    this.props.actions.onSubmitMessage()
  }

  getInitialMessage() {
    const socket = io()

    let chats = null
    let _this = this
    socket.emit('get_initial_message', () => {
      console.log('SEND MSG REQUEST')

    })
    socket.on('return_initial_message', (chat_datas) => {
      chats = chat_datas
      console.log(chats)
      _this.props.actions.onInitialMessages(chats)
    })
  }

  loadUsersFromServer() {
    let user_id = this.props.chat.myId

    // 繋がり済みのユーザをajaxで取得
    this.props.chat.users = [{
      screenname: "田中太郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "tanaka_3484_t",
      created: "timestamp",
      uuid: "abcdefg"
    }, {
      screenname: "田中二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "ziro_name",
      created: "timestamp",
      uuid: "zirodesu"
    }]
  }

}

const mapState = (state, ownProps) => ({
  chat: state.chat,
})

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(ChatContainer)
