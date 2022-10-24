import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
import { selectUser } from '../../features/userSlice'
import { useSelector } from 'react-redux'
import styles from "../../styles/Account.module.scss"
import { deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../../firebase'
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router'
import { useRouter } from 'next/router'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { async } from '@firebase/util'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))
export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
const Account = () => {
  const user = useSelector(selectUser)
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [open3, setOpen3] = React.useState(false)
  const [open4, setOpen4] = React.useState(false)
  const [provider, setProvider] = React.useState(false)
  const [resetemail, setResetEmail] = useState("")
  const [resetpassword, setResetPassword] = useState("")
  const [password, setPassword] = useState("")
  const [avatardemoImage, setAvatardemoImage] = useState("")

  const handleClickOpen1 = () => {
    setOpen1(true)
  }
  const handleClickOpen2 = () => {
    setOpen2(true)
  }
  const handleClickOpen3 = () => {
    setOpen3(true)
  }
  const handleClose1 = () => {
    setOpen1(false)
    setResetEmail("")
    setResetPassword("")
  }
  const handleClose2 = () => {
    setOpen2(false)
    setPassword("")
    setResetPassword("")
  }
  const handleClose3 = () => {
    setOpen3(false)
  }
  const handleClose4 = () => {
    setOpen4(false)
    setAvatardemoImage("")
    setAvatarImage(null)
  }
  const router = useRouter()
  const onAccountDelete = async () => {
    var result = confirm('アカウントを削除しますか？')
    if (result) {
      onAuthStateChanged(auth, async (authUser) => {
        if (authUser !== null) {
          const docRef = collection(db, "users", authUser.uid, "myposts")
          const docSnap = await getDocs(docRef)
          docSnap.forEach(async (docde) => {
            await deleteDoc(doc(db, "posts", docde.id))
          })
        }
      })
      deleteDoc(doc(db, "users", auth.currentUser.uid))
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      )
      const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      )
      await deleteUser(result.user).then(() => {
        router.replace('/')
        alert("アカウントを削除しました")
      }).catch((error) => {
        alert("パスワードが間違っています")
      })
    }
  }
  const onNewEmail = async () => {
    signInWithEmailAndPassword(auth, user.email, resetpassword)
      .then((userCredential) => {
        updateEmail(auth.currentUser, resetemail).then(() => {
          setOpen1(false)
          setResetEmail("")
          setResetPassword("")
        }).catch((error) => {
          alert(error.massage)
          setResetEmail("")
          setResetPassword("")
        })
      })
      .catch((error) => {
        alert("パスワードが間違っています")
        setResetPassword("")
      })
  }
  const onNewPassword = async () => {
    signInWithEmailAndPassword(auth, user.email, password)
      .then((userCredential) => {
        updatePassword(auth.currentUser, resetpassword).then(() => {
          setOpen2(false)
          setPassword("")
          setResetPassword("")
        }).catch((error) => {
          alert(error.massage)
          setPassword("")
          setResetPassword("")
        })
      })
      .catch((error) => {
        alert("パスワードが間違っています")
        setPassword("")
      })
  }
  const onImgupdateOpen = () => {
    setOpen4(true)
  }
  const onImgupdate = async () => {
    let url = ""
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("")
      const fileName = randomChar + "_" + avatarImage.name
      await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage)
      url = await getDownloadURL(ref(storage, `avatars/${fileName}`))
    }
    updateProfile(auth.currentUser, {
      photoURL: url
    }).then(() => {
      alert("変更しました")
      setAvatardemoImage("")
      setAvatarImage(null)
    }).catch((error) => {
      alert("変更に失敗しました")
      setAvatardemoImage("")
      setAvatarImage(null)
    })
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser !== null) {
        if (authUser.providerData[0].providerId != "google.com") {
          setProvider(true)
        }
      }
    })
  }, [])
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0])
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setAvatardemoImage(e.target.result)
      }
      reader.readAsDataURL(file)
      e.target.value = ""
    }
  }
  return (
    <>
      <ul className={styles.ac_list}>
        <li>
          <div className={styles.tl}>
            <h3>プロフィール画像</h3>
          </div>
          <button onClick={onImgupdateOpen} className={styles.avatar_buttton}><Avatar src={user.photoUrl} sx={{ width: 60, height: 60 }} /><span className={styles.img_up_txt}>編集</span></button>
        </li>
        {/* <li>
          <div className={styles.tl}>
            <h3>プラン</h3>
          </div>
          <div className="plan_type">ベーシックプラン</div>
        </li> */}
        {provider ? (
          <li>
            <div className={styles.tl}>
              <h3>メールアドレス</h3>
              <span>{user.email}</span>
            </div>
            <Button variant="outlined" onClick={handleClickOpen1}>メールアドレス変更</Button>
          </li>
        ) : ""}
        {provider ? (
          <li>
            <div className={styles.tl}>
              <h3>パスワード</h3>
            </div>
            <Button variant="outlined" onClick={handleClickOpen2}>パスワード変更</Button>
          </li>
        ) : ""}
        <li>
          <Button variant="outlined" color="error" onClick={handleClickOpen3}>
            アカウント削除
          </Button>
        </li>
      </ul>

      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
        fullWidth
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1}>
          メールアドレス変更
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <TextField
              margin="normal"
              id="outlined-basic"
              label="新しいメールアドレス"
              variant="outlined"
              fullWidth
              value={resetemail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setResetEmail(e.target.value) }} />
            <TextField
              margin="normal"
              id="outlined-basic"
              label="パスワード"
              variant="outlined"
              type="password"
              fullWidth
              value={resetpassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setResetPassword(e.target.value) }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onNewEmail} variant="outlined">
            変更
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose2}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
          パスワード変更
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <TextField
              margin="normal"
              id="outlined-basic"
              label="現在のパスワード"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
            <TextField
              margin="normal"
              id="outlined-basic"
              label="新しいパスワード"
              variant="outlined"
              fullWidth
              type="password"
              value={resetpassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setResetPassword(e.target.value) }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onNewPassword} variant="outlined">
            変更
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose3}
        aria-labelledby="customized-dialog-title"
        open={open3}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose3}>
          注意
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            アカウントを削除した場合、アカウント情報、企業情報、投稿記事の全てが失われます。
          </Typography>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="現在のパスワード"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onAccountDelete} color="error" variant="outlined">
            削除
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <Dialog open={open4} onClose={handleClose4}>
        <DialogTitle>プロフィール画像変更</DialogTitle>
        <DialogContent className={styles.dialog_icon_box}>
          <IconButton>
            <label className={styles.avatar_buttton}>
              <Avatar
                src={avatardemoImage}
                sx={{ width: 60, height: 60 }}
              />
              <input
                className={styles.login_hiddenIcon}
                type="file"
                onChange={onChangeImageHandler}
              />
              <span className={styles.img_up_txt}>編集</span>
            </label>
          </IconButton>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose4}>キャンセル</Button>
          <Button onClick={onImgupdate} variant="contained">変更</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Account