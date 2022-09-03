import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import AddIcon from '@mui/icons-material/Add';
import styles from "../../styles/Quest.module.scss"

const QuestInput: React.FC = () => {
    const user = useSelector(selectUser)
    const [postcode, sePostcode] = useState("")
    const [add1, setAdd1] = useState("")
    const [add2, setAdd2] = useState("")
    const [add3, setAdd3] = useState("")
    const [jobname, setJobname] = useState("")
    const [salarytype, setSalarytype] = useState("")
    const [salarymin, setSalarymin] = useState("")
    const [salarymax, setSalarymax] = useState("")
    const [workingstatus, setWorkingstatus] = useState("")
    const [rlimit, setRlimit] = useState("")
    const [rurl, setRurl] = useState("")
    const [remail, setRemail] = useState("")
    const [remailtxt, setRemailtxt] = useState("")
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const sendQuest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const adddocRef = addDoc(collection(db, "posts"), {
            postcode: postcode,
            add1: add1,
            add2: add2,
            add3: add3,
            jobname: jobname,
            salarytype: salarytype,
            salarymin: salarymin,
            salarymax: salarymax,
            workingstatus: workingstatus,
            rlimit: rlimit,
            rurl: rurl,
            remail: remail,
            remailtxt: remailtxt,
            timestamp: serverTimestamp(),
            username: user.displayName,
        }).then(function (docQuest) {
            const docRef = doc(db, "users", user.uid, "myposts", docQuest.id);
            setDoc((docRef), {
                timestamp: serverTimestamp(),
            })
        })
        sePostcode("")
        setAdd1("")
        setAdd2("")
        setAdd3("")
        setJobname("")
        setSalarytype("")
        setSalarymin("")
        setSalarymax("")
        setWorkingstatus("")
        setRlimit("")
        setRurl("")
        setRemail("")
        setRemailtxt("")
    }
    return (
        <>
            <div className={styles.post_bt}>
                <button
                    type='submit'
                    onClick={() => handleClickOpen()}
                >
                    <AddIcon sx={{ fontSize: 60, color: "#ffffff" }} />
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>求人掲載アカウントの登録</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Eメール"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { sePostcode(e.target.value) }}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd1(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button>
                        登録
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default QuestInput