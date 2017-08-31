import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as actions from "../actions"

import UsersSidebar from "../components/UsersSidebar"

class ChatContainer extends Component {

  render() {
    const { chat, actions } = this.props

    return (
      <div>
        <UsersSidebar />
        <section className="content--main">
          <textarea value={chat.message} onChange={e => actions.onTypeMessage(e.target.value)}></textarea>
          <button onClick={actions.onSubmitMessage}>送信</button>
          <div className="chat-area">
            {chat.chats.map(chat => (
              <p>{chat.message}</p>
            ))}
          </div>
        </section>
      </div>
    )

  }

  componentWillMount() {
    //　新規メッセージをキャッチするリスナー処理
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
