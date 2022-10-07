import { Container } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import Sidebar from './mypage-item/Sidebar'
import Main from './mypage-item/Main'
import SetProfile from './mypage-item/SetProfile'
import styles from '../styles/mypage.module.scss'
import QuestButton from './mypage-item/QuestButton'
import { useEffect, useState } from 'react'

const Mypage: React.FC = () => {
  const user = useSelector(selectUser)
  const [page, setPage] = useState("")
  const [pagecomp, setPageComp] = useState(false)
  useEffect(() => {
    setPage(window.location.pathname)
    if (user.company != "" && user.tel != "" && user.postcode != "" && user.add1 != "" && user.add2 != "" && user.add3 != "") {
      setPageComp(true)
    }
  }, [])
  return (
    <>
      {
        pagecomp ? (
          <>
            <div className={styles.mypage_continar}>
              <Sidebar />
              <Main page={page} />
            </div>
            <QuestButton />
          </>
        ) : (
          <Container>
            <div className={styles.setpage_wrap}>
              <h1 className="com_h1">企業情報登録</h1>
              <SetProfile />
            </div>
          </Container>
        )
      }
    </>
  )
}

export default Mypage