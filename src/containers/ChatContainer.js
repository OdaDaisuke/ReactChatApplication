import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import $ from "jquery"

import * as actions from "../actions"
import UsersSidebar from "../components/UsersSidebar"

class ChatContainer extends Component {

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
                  <div className="message message--receive">
                    <span>@{_chat.from_id}</span>
                    <p>{_chat.body}</p>
                  </div>
                )

              } else if(_chat.from_id === chat.myId &&
                  _chat.send_to === chat.currentOpponent.uuid) {
                return (
                  <div className="message message--send">
                    <p>{_chat.body}</p>
                  </div>
                )

              } else {
                return ''

              }
            })}
          </div>
          <div className="chat-form">
            <textarea placeholder="内容を入力" value={chat.message} onChange={e => actions.onTypeMessage(e.target.value)}></textarea>
            <button onClick={actions.onSubmitMessage}>送信</button>
          </div>
        </div>
      </section>
    )

  }

  componentWillMount() {
    //　新規メッセージをキャッチするリスナー処理
    this.startMessageListener()

    this.loadUsersFromServer()
    this.loadChatsFromServer()

    this.props.chat.currentOpponent = {
      screenname: "田中二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "ziro_name",
      created: "timestamp",
      uuid: "zirodesu"
    }
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
    },{
      uuid: 'messageUUIDdesu',
      created: 'timestamp',
      body: 'サンプルのメッセージを送ります。「<br>asdfaa asfd」',
      from_id: 'zirodesu',
      send_to: 'daisukeoda'
    },{
      uuid: 'messageUUIDdesuasdf',
      created: 'timestamp',
      body: 'はい',
      from_id: 'daisukeoda',
      send_to: 'zirodesu'
    },]
  }

  startMessageListener() {
  }

  loadUsersFromServer() {
    // let _this = this
    let user_id = this.props.chat.myId

    $.ajax('/api/message', {
      type: 'get',
      data: {
        user_id: user_id
      }
    })
    .done((data) => {
      console.log(data)
      // _this.props.chats.push(data)
    })

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


  loadChatsFromServer() {
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
