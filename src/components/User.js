import React, { Component } from "react"

const User = ({profileUrl, uuid, onSelectUser}) => (
  <div className="user-item" onClick={onSelectUser(uuid)}>
    <img src="{user.profileUrl}" alt="profile" />
    <p>{user.screenname}</p>
  </div>
)

export default UserSidebar
