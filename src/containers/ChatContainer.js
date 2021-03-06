import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import $ from "jquery"
import io from 'socket.io-client'

import * as actions from "../actions"
import UsersSidebar from "../components/UsersSidebar"
import InputForm from "../components/InputForm"
import ChatList from "../components/ChatList"

const socket = io()

class ChatContainer extends Component {

  constructor(props) {
    super(props)
    let _this = this

    /**
     * bind
     */
    this.deleteAllMessage = this.deleteAllMessage.bind(this)

    /**
     * メッセージを送信後のserverからのレスポンス
     * が帰ってきたらDOMに反映
     */
    socket.on('return_send_message', (chat_data) => {
      chat_data = JSON.parse(chat_data)
      _this.props.actions.onSubmitMessage(chat_data)
    })

    /**
     * ページ読み込み時の初期メッセージ取得に対するレスポンス
     */
    socket.on('return_initial_message', (chat_datas) => {
      let chats = chat_datas
      _this.props.actions.onInitialMessages(chats)
    })

    /**
     * 全メッセージ削除に対するレスポンス
     */
    socket.on('return_dev_delete_all_message', () => {
      _this.props.actions.onDeleteAllMessage()
    })

  }

  render() {
    const { chatReducer, actions } = this.props

    return (
      <section className="content--main">
        <UsersSidebar
          selectedUserId={chatReducer.currentOpponent.uuid}
          onSelectUser={actions.onSelectUser}
          onSelectMe={actions.onSelectMe}
          users={chatReducer.users}
          myId={chatReducer.myId} />
        <div className="chat-area">
          <ChatList
            chats={chatReducer.chats}
            currentOpponent={chatReducer.currentOpponent}
            myId={chatReducer.myId} />
          <InputForm
            messageValu={chatReducer.message}
            onTypeMessage={actions.onTypeMessage}
            onSubmit={actions.onSetMessageInfo}
            onDeleteAll={this.deleteAllMessage} />
        </div>
      </section>
    )

  }

  componentWillMount() {
    this.loadUsersFromServer()

    this.props.chatReducer.currentOpponent = {
      screenname: "山本二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "yamamoto_name",
      created: "timestamp",
      uuid: "yamamoto_name4324adsf9aoE0823"
    }

  }

  componentDidMount() {
    socket.emit('get_initial_message', () => {
      console.log('SEND get_initial_message REQUEST')
    })
  }

  deleteAllMessage() {
    if(confirm('全メッセージ本当に削除しますか？')) {
      socket.emit('dev_delete_all_message', () => {
        console.log('SEND dev_delete_all_message REQUEST')
      })
    }
  }

  loadUsersFromServer() {
    let user_id = this.props.chatReducer.myId

    // 繋がり済みのユーザをajaxで取得
    this.props.chatReducer.users = [{
      screenname: "大輔",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "daisuke",
      created: "timestamp",
      uuid: "daisuke98Ae34fp03A2ECskerha4bta2e"
    }, {
      screenname: "山本二郎",
      profileUrl: 'http://placehold.jp/444444/ffffff/150x150.png?text=User',
      handle_name: "yamamoto_name",
      created: "timestamp",
      uuid: "yamamoto_name4324adsf9aoE0823"
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
