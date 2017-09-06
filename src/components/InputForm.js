import React, { Component } from "react"

const InputForm = ({messageValu, onTypeMessage, onSubmit, onDeleteAll}) => (
  <div className="chat-form">
    <textarea placeholder="内容を入力" value={messageValu} onChange={e => onTypeMessage(e.target.value)}></textarea>
    <button onClick={onSubmit} className="btn">送信</button>
    <button onClick={onDeleteAll} className="btn btn--danger">全削除</button>
  </div>
)

export default InputForm
