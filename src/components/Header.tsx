import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <header className="com_hed">
      <h1 className="logo">
        <Link href="/">
          <a>Micro Guild</a>
        </Link>
      </h1>
      {/* {userc ? (
        <>
          <button className='logout' onClick={() => signOut(auth)}><LogoutIcon sx={{ color: '#ffffff' }} /></button>
        </>
      ) : (
        <>
          <Link href="/mypage/home">
            <a>求人掲載</a>
          </Link>
        </>
      )} */}
    </header>
  )
}

export default Header