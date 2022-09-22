import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import LogoutIcon from '@mui/icons-material/Logout';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';

const Header = () => {
  const user = useSelector(selectUser)
  const [userc, setUserc] = useState(false)
  useEffect(() => {
    if (user.uid) {
      setUserc(true)
    }
  }, [])
  return (
    <header className="com_hed">
      <h1 className="logo">
        Micro Guild
      </h1>
      {userc ? <button className='logout' onClick={() => signOut(auth)}><LogoutIcon sx={{ color: '#ffffff' }} /></button> : ""}
    </header>
  )
}

export default Header