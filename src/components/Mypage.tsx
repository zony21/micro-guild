import React from 'react'
import { auth } from '../firebase'

const Mypage = () => {
  return (
    <div>
      Mypage

      <button onClick={() => auth.signOut()}>ログアウト</button>
    </div>
  )
}

export default Mypage