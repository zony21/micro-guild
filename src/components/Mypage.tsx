import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import Sidebar from './mypage-item/Sidebar'
import Main from './mypage-item/Main'
import Profile from './mypage-item/Profile'
import styles from '../styles/mypage.module.scss'
import QuestButton from './mypage-item/QuestButton'
import { useEffect, useState } from 'react'

const Mypage: React.FC = () => {
  const user = useSelector(selectUser)
  const [page, setPage] = useState("")
  useEffect(() => {
    setPage(window.location.pathname)
  }, [])
  return (
    <>
      {
        user.company != "" && user.tel != "" && user.postcode != "" && user.add1 != "" && user.add2 != "" && user.add3 != "" ? (
          <>
            <div className={styles.mypage_continar}>
              <Sidebar />
              <Main page={page} />
            </div>
            <QuestButton />
          </>
        ) : (
          <Container>
            <h1 className="com_h1">企業情報登録</h1>
            <Profile />
          </Container>
        )
      }
    </>
  )
}

export default Mypage