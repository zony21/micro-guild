import React from 'react'
import { auth } from '../firebase'

const Header = () => {
  return (
    <header className="com_hed">
      <div className="logo">
        ヘッダー
      </div>
      <button onClick={() => auth.signOut()}>ログアウト</button>
    </header>
  )
}

export default Header