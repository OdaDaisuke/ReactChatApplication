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
        <UsersSidebar onSelectUser={actions.onSelectUser} users={chat.users} />
        <section className="content--main">
          <textarea value={chat.message} onChange={e => actions.onTypeMessage(e.target.value)}></textarea>
          <button onClick={actions.onSubmitMessage}>送信</button>
          <div className="chat-area">
            {chat.chats.map(_chat => {
              if(_chat.from_id === chat.currentOpponent &&
                _chat.send_to === chat.myId) {
                return <p className="receive">{_chat.body}</p>
              } else if(_chat.from_id === chat.myId &&
                  _chat.send_to === chat.currentOpponent) {
                return <p className="send">{_chat.body}</p>
              }
            })}
            <p>相手 : @{chat.currentOpponent}</p>
          </div>
        </section>
      </div>
    )

  }

  componentWillMount() {
    //　新規メッセージをキャッチするリスナー処理

    // 繋がり済みのユーザをajaxで取得
    this.props.chat.users = [{
      screenname: "田中太郎",
      profileUrl: 'image url',
      handleName: "handle_name",
      created: "timestamp",
      uuid: "abcdefg"
    }, {
      screenname: "田中二郎",
      profileUrl: 'image url',
      handleName: "ziro_name",
      created: "timestamp",
      uuid: "zirodesu"
    }]

    this.props.chat.currentOpponent = 'zirodesu'
    this.props.chat.myId = 'daisukeoda'

    this.props.chat.chats = [{
      uuid: 'messageUUIDdesu',
      created: 'timestamp',
      body: 'よう',
      from_id: 'zirodesu',
      send_to: 'daisukeoda'
    },{
      uuid: 'messageUUIDdesuasdf',
      created: 'timestamp',
      body: 'おうどうした',
      from_id: 'daisukeoda',
      send_to: 'zirodesu'
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
