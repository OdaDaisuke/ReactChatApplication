import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import $ from "jquery"
import io from 'socket.io-client'

import * as actions from "../actions"
import UsersSidebar from "../components/UsersSidebar"

const socket = io()

class ChatContainer extends Component {

  constructor(props) {
    super(props)
    let _this = this

    /**
     * メッセージを送信後のserverからのレスポンス
     * が帰ってきたらDOMに反映
     */
    socket.on('return_send_message', (chat_data) => {
      _this.props.actions.onSubmitMessage()
    })

    /**
     * ページ読み込み時の初期メッセージ取得に対するレスポンス
     */
    socket.on('return_initial_message', (chat_datas) => {
      let chats = chat_datas
      _this.props.actions.onInitialMessages(chats)
    })

  }

  render() {
    const { chatReducer, actions } = this.props

    return (
      <section className="content--main">
        <UsersSidebar selectedUserId={chatReducer.currentOpponent.uuid} onSelectUser={actions.onSelectUser} users={chatReducer.users} />
        <div className="chat-area">
          <div className="chat-conversation">
            {chatReducer.chats.map(_chat => {
              if(_chat.from_id === chatReducer.currentOpponent.uuid &&
                _chat.send_to === chatReducer.myId) {
                return (
                  <div key={_chat.uuid} className="message message--receive">
                    <span>@{_chat.from_id}</span>
                    <p>{_chat.body}</p>
                  </div>
                )

              } else if(_chat.from_id === chatReducer.myId &&
                  _chat.send_to === chatReducer.currentOpponent.uuid) {
                return (
                  <div key={_chat.uuid} className="message message--send">
                    <p>{_chat.body}</p>
                  </div>
                )

              }
            })}
          </div>
          <div className="chat-form">
            <textarea placeholder="内容を入力" value={chatReducer.message} onChange={e => actions.onTypeMessage(e.target.value)}></textarea>
            <button onClick={actions.onSetMessageInfo}>送信</button>
          </div>
        </div>
      </section>
    )

  }

  componentWillMount() {
    this.loadUsersFromServer()

    this.props.chatReducer.currentOpponent = {
      screenname: "田中二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "ziro_name",
      created: "timestamp",
      uuid: "ziro_name432490823"
    }

  }

  componentDidMount() {
    socket.emit('get_initial_message', () => {
      console.log('SEND get_initial_message REQUEST')
    })
  }

  loadUsersFromServer() {
    let user_id = this.props.chatReducer.myId

    // 繋がり済みのユーザをajaxで取得
    this.props.chatReducer.users = [{
      screenname: "大輔",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "daisukeoda",
      created: "timestamp",
      uuid: "daisukeoda98343242"
    }, {
      screenname: "田中二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "ziro_name",
      created: "timestamp",
      uuid: "ziro_name432490823"
    }]
  }

}

const mapState = (state, ownProps) => ({
  chatReducer: state.chatReducer,
})

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(ChatContainer)
