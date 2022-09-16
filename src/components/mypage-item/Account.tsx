import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import styles from "../../styles/Account.module.scss"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

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
  );
};
const Account = () => {
  const user = useSelector(selectUser)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onAccountDelete = () => {
    var result = confirm('アカウントを削除しますか？');
  }
  return (
    <>
      <ul className={styles.ac_list}>
        <li>
          <div className={styles.tl}>
            <h3>メールアドレス</h3>
            <span>{user.email}</span>
          </div>
          <Button variant="outlined">メールアドレス変更</Button>
        </li>
        <li>
          <div className={styles.tl}>
            <h3>パスワード</h3>
          </div>
          <Button variant="outlined">パスワード変更</Button>
        </li>
        <li>
          <Button variant="outlined" color="error" onClick={handleClickOpen}>
            アカウント削除
          </Button>
        </li>
      </ul>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          注意事項
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            アカウントを削除した場合、アカウント情報、企業情報、投稿記事の全てが失われます。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAccountDelete} color="error">
            削除
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default Account