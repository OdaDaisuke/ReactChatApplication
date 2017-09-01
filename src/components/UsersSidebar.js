import React, { Component } from "react"

const UserSidebar = ({users, onSelectUser}) => (
  <aside className="user-sidebar">
    {users.map(user => (
      <div className="user-item" uuid={user.uuid} onClick={() => onSelectUser(user.uuid)}>
        <img src="{user.profileUrl}" alt="profile" />
        <p>{user.screenname}</p>
      </div>
    ))}
  </aside>
)

export default UserSidebar
