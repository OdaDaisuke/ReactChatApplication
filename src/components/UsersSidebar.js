import React from "react"
import ClassNames from "classnames"

const UserSidebar = ({users, selectedUserId, onSelectUser}) => (
    <aside className="user-sidebar">
      {users.map(user => {
        const classNames = ClassNames({
          "user-item": true,
          "selected": (user.uuid === selectedUserId)
        })
        return (
          <div className={classNames} key={user.uuid} onClick={() => onSelectUser(user.uuid)}>
            <div className="profile">
              <img src={user.profileUrl} alt={user.screenname} />
            </div>
            <div className="names">
              <h3>{user.screenname}</h3>
              <p>@{user.handle_name}</p>
            </div>
          </div>
        )
      })}
    </aside>
)

export default UserSidebar
