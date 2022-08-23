import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from "../styles/Auth.module.scss"
import { auth, provider, storage } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateUserProfile } from '../features/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton, ListItemText } from '@mui/material';

const theme = createTheme();
const Auth: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [isLogin, setIsLogin] = useState(true)
  const [openModal, setOpenModal] = React.useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [open, setOpen] = React.useState(false)
  const [avatardemoImage, setAvatardemoImage] = useState("")
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0])
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e: any) => {
        console.log(e.target.result)
        setAvatardemoImage(e.target.result)
      }
      reader.readAsDataURL(file)
      e.target.value = ""
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password)
  }
  const signUpEmail = async () => {

    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;
      await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage);
      url = await getDownloadURL(ref(storage, `avatars/${fileName}`));
    }

    if (authUser.user) {
      await updateProfile(authUser.user, {
        displayName: username,
        photoURL: url,
      });
    }

    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
  };
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
                  新規登録
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signInGoogle}
              startIcon={<GoogleIcon />}
            >
              Googleで続ける
            </Button>
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
              <Link href="privacy"><a>個人情報保護について</a></Link>
            </Box>
            <Box>
              <FormControlLabel
                label="個人情報保護に同意する"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>キャンセル</Button>
            <Button
              disabled={!email || password.length < 6 || !avatarImage || !checked}
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
      </Container>
    </ThemeProvider>
  );
}

export default Auth