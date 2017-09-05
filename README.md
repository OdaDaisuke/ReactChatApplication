# Usage

## 1.ビルド&起動

```terminal
$ yarn
$ yarn run develop # webpacでreactをビルド
$ node ./server/server.js
```

## 2.開発する場合

```terminal
$ yarn run watch
```

# 仕様

View : React + Redux
Backend : Node.js
Chat System : WebSocket

# チャット処理フロー

1.送信ボタンをクリックしたら

2.チャットデータと送信主データオブジェクトをwebsocketでnodeに渡す。

3.node側でデータをDBに登録

4.登録データをjsonにエンコードして返す

5.React側でDOMに反映
