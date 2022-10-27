import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogActions,
  IconButton,
  ListItemText,
  Modal,
  DialogContent,
  DialogTitle,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import GoogleIcon from '@mui/icons-material/Google'
import { makeStyles } from '@material-ui/core/styles'
import styles from "../styles/Auth.module.scss"
import { auth, provider, storage } from '../firebase'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { updateUserProfile } from '../features/userSlice'

const theme = createTheme()

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%,-${left}%)`
  }
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1589793907316-f94025b46850?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=932&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}))

const Auth: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
  }
  const classes = useStyles()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [openModal, setOpenModal] = React.useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [open, setOpen] = React.useState(false)
  const [avatardemoImage, setAvatardemoImage] = useState("")
  const [checked, setChecked] = React.useState(false)

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await sendPasswordResetEmail(auth, resetEmail).then(() => {
      setOpenModal(false)
      setResetEmail("")
    }).catch((err) => {
      alert(err.massage)
      setResetEmail("")
    })
  }

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
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
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password)
  }
  const signUpEmail = async () => {

    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
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

    if (authUser.user) {
      await updateProfile(authUser.user, {
        photoURL: url,
      })
    }

    dispatch(
      updateUserProfile({
        photoUrl: url,
        email: email,
        displayName: '',
        hpurl: '',
        company: '',
        tel: '',
        postcode: '',
        add1: '',
        add2: '',
        add3: ''
      })
    )
  }
  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Eメール"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
            />
            <Button
              disabled={!email || password.length < 6}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<EmailIcon />}
              onClick={
                async () => {
                  try {
                    await signInEmail()
                  } catch (err: any) {
                    alert(err.massage)
                  }
                }
              }
            >
              メールアドレスで続ける
            </Button>
            <Grid container>
              <Grid item xs>
                <span
                  className={styles.login_reset}
                  onClick={() => setOpenModal(true)}
                >パスワードをお忘れですか？</span>
              </Grid>
              <Grid item>
                <span
                  className={styles.login_toggleMode}
                  onClick={() => handleClickOpen()}
                >
                  無料新規登録
                </span>
              </Grid>
            </Grid>
            {/* <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signInGoogle}
              startIcon={<GoogleIcon />}
            >
              Googleで続ける
            </Button> */}
          </Box>
        </Box>
        {/* アカウント登録ポップアップ */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>求人掲載アカウントの登録</DialogTitle>
          <DialogContent>
            <Box textAlign="center">
              {avatardemoImage ?
                (
                  <IconButton>
                    <label>
                      <Avatar
                        src={avatardemoImage}
                      />
                      <input
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                ) :
                (
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={
                          avatarImage
                            ? styles.login_addIconLoaded
                            : styles.login_addIcon
                        }
                      />
                      <input
                        className={styles.login_hiddenIcon}
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                    </label>
                  </IconButton>
                )
              }
              <ListItemText secondary="アイコン画像を選択" />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Eメール"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
            />
            <TextField
              helperText="半角英小文字・大文字・数字・記号を組合せて6字以上で入力してください。"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
            />
            <Box>
              <Link href="/privacy"><a target="_blank">個人情報保護について</a></Link>
            </Box>
            <Box>
              <FormControlLabel
                label="個人情報保護に同意する"
                control={
                  <Checkbox
                    onChange={handleChange1}
                  />
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>キャンセル</Button>
            <Button
              disabled={!email || password.length < 6 || !checked || !email.match(/.+@.+\..+/)}
              variant="contained"
              onClick={
                async () => {
                  try {
                    await signUpEmail()
                  } catch (err: any) {
                    alert(err.massage)
                  }
                }
              }>
              登録
            </Button>
          </DialogActions>
        </Dialog>
        {/* アカウント登録ポップアップ */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div style={getModalStyle()} className={classes.modal}>
            <div className={styles.login_modal}>
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                type="email"
                name="email"
                label="登録時Eメールアドレス"
                value={resetEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setResetEmail(e.target.value)
                }}
              >
              </TextField>
              <IconButton onClick={sendResetEmail}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      </Container>
    </ThemeProvider>
  )
}

export default Auth