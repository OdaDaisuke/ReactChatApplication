import React from "react"
import ClassNames from "classnames"

const UserSidebar = ({users, selectedUserId, onSelectUser, onSelectMe, myId}) => (
    <aside className="user-sidebar">
      {users.map(_user => {
        const classNames = ClassNames({
          "user-item": true,
          "selected": (_user.uuid === selectedUserId)
        })
        return (
          <div className={classNames} key={_user.uuid} onClick={() => onSelectUser(_user.uuid)}>
            <div className="profile">
              <img src={_user.profileUrl} alt={_user.screenname} />
            </div>
            <div className="names">
              <h3>{_user.screenname}</h3>
              <p>@{_user.handle_name}</p>
            </div>
          </div>
        )
      })}
      <h2>自分を選ぶ</h2>
      {users.map(_user => {
        const classNames = ClassNames({
          "user-item": true,
          "selected": (_user.uuid === myId)
        })
        return (
          <div className={classNames} key={_user.uuid} onClick={() => onSelectMe(_user.uuid)}>
            <div className="profile">
              <img src={_user.profileUrl} alt={_user.screenname} />
            </div>
            <div className="names">
              <h3>{_user.screenname}</h3>
              <p>@{_user.handle_name}</p>
            </div>
          </div>
        )
      })}
      <h2>自分</h2>
      <p>{myId}</p>
    </aside>
)

export default UserSidebar
