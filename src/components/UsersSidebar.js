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
            <p>{user.screenname}</p>
          </div>
        )
      })}
    </aside>
)

export default UserSidebar
