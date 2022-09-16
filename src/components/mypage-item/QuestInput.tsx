import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import AddIcon from '@mui/icons-material/Add';
import styles from "../../styles/Quest.module.scss"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@date-io/date-fns';
import { Dayjs } from 'dayjs';
import moment from 'moment'

const QuestInput: React.FC = () => {
    const user = useSelector(selectUser)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [postcode, setPostcode] = useState("")
    const [add1, setAdd1] = useState("")
    const [add2, setAdd2] = useState("")
    const [add3, setAdd3] = useState("")
    const [jobname, setJobname] = useState("")
    const [salarytype, setSalarytype] = useState("")
    const [salarymin, setSalarymin] = useState("")
    const [salarymax, setSalarymax] = useState("")
    const [workingstatus, setWorkingstatus] = useState("")
    var date = new Date()
    var limitdays = moment(date).add(5, 'M').format()
    const [rlimit, setRlimit] = useState<Dayjs | null | string>(
        limitdays
    );
    const [recruit, setRecruit] = useState("")
    const [remail, setRemail] = useState("")
    const [remailtxt, setRemailtxt] = useState("")
    const [open, setOpen] = React.useState(false)
    const handleChangedays = (newValue: Dayjs | null) => {
        setRlimit(newValue);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        setPostcode(user.postcode)
        setAdd1(user.add1)
        setAdd2(user.add2)
        setAdd3(user.add3)
        setRemail(user.email)
    }, [])
    const sendQuest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const adddocRef = addDoc(collection(db, "posts"), {
            title: title,
            text: text,
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
            recruit: recruit,
            remail: remail,
            remailtxt: remailtxt,
            timestamp: serverTimestamp(),
            username: user.displayName,
            userid: user.uid,
        }).then(function (docQuest) {
            const docRef = doc(db, "users", user.uid, "myposts", docQuest.id);
            setDoc((docRef), {
                timestamp: serverTimestamp(),
            })
        })
        setTitle("")
        setText("")
        setPostcode(user.postcode)
        setAdd1(user.add1)
        setAdd2(user.add2)
        setAdd3(user.add3)
        setJobname("")
        setSalarytype("")
        setSalarymin("")
        setSalarymax("")
        setWorkingstatus("")
        setRlimit(limitdays)
        setRemail(user.email)
        setRemailtxt("")
    }

    return (
        <>
            <div className={styles.post_bt}>
                <button
                    onClick={() => handleClickOpen()}
                >
                    <AddIcon sx={{ color: "#ffffff" }} />
                </button>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>求人投稿</DialogTitle>
                <Box component="form" onSubmit={sendQuest}>
                    <DialogContent>
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                value={title}
                                required
                                fullWidth
                                id="title"
                                label="タイトル"
                                name="title"
                                autoComplete="title"
                                autoFocus
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                variant="outlined"
                                value={text}
                                required
                                fullWidth
                                multiline
                                name="text"
                                label="本文"
                                type="text"
                                id="text"
                                rows={10}
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={postcode}
                                fullWidth
                                id="postcode"
                                label="郵便番号"
                                name="postcode"
                                autoComplete="postcode"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPostcode(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add1}
                                fullWidth
                                id="add1"
                                label="都道府県"
                                name="add1"
                                autoComplete="add1"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd1(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add2}
                                fullWidth
                                id="add2"
                                label="勤務地住所（市区）"
                                name="add2"
                                autoComplete="add2"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd2(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add3}
                                fullWidth
                                id="add3"
                                label="勤務地住所（詳細）"
                                name="add3"
                                autoComplete="add3"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd3(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={jobname}
                                fullWidth
                                id="jobname"
                                label="職種名"
                                name="jobname"
                                autoComplete="jobname"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setJobname(e.target.value) }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">給与額の区分</InputLabel>
                                <Select
                                    labelId="salarytype-label"
                                    id="salarytype"
                                    label="給与額の区分"
                                    value={salarytype || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarytype(e.target.value) }}
                                >
                                    <MenuItem value={""}>選択してください</MenuItem>
                                    <MenuItem value={"時給"}>時給</MenuItem>
                                    <MenuItem value={"日給"}>日給</MenuItem>
                                    <MenuItem value={"週休"}>週休</MenuItem>
                                    <MenuItem value={"月給"}>月給</MenuItem>
                                    <MenuItem value={"年収"}>年収</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                value={salarymin}
                                fullWidth
                                id="salarymin"
                                label="給与下限"
                                name="salarymin"
                                autoComplete="salarymin"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarymin(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                value={salarymax}
                                id="salarymax"
                                label="給与上限"
                                name="salarymax"
                                autoComplete="salarymax"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarymax(e.target.value) }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">雇用形態</InputLabel>
                                <Select
                                    labelId="workingstatus-label"
                                    id="workingstatus"
                                    label="雇用形態"
                                    value={workingstatus || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setWorkingstatus(e.target.value) }}
                                >
                                    <MenuItem value={""}>選択してください</MenuItem>
                                    <MenuItem value={"正社員"}>正社員</MenuItem>
                                    <MenuItem value={"パート・アルバイト"}>パート・アルバイト</MenuItem>
                                    <MenuItem value={"契約社員"}>契約社員</MenuItem>
                                    <MenuItem value={"派遣社員"}>派遣社員</MenuItem>
                                    <MenuItem value={"インターンシップ"}>インターンシップ</MenuItem>
                                    <MenuItem value={"ボランティア"}>ボランティア</MenuItem>
                                    <MenuItem value={"日雇い"}>日雇い</MenuItem>
                                    <MenuItem value={"その他"}>その他</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="投稿期限"
                                    inputFormat="MM/dd/yyyy"
                                    value={rlimit}
                                    onChange={handleChangedays}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                margin="normal"
                                fullWidth
                                value={recruit}
                                id="recruit"
                                label="応募フォームURL"
                                name="recruit"
                                autoComplete="recruit"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRecruit(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="remail"
                                value={remail}
                                label="応募用メールアドレス"
                                name="remail"
                                autoComplete="remail"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRemail(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={remailtxt}
                                multiline
                                name="remailtxt"
                                label="応募メールアドレス注意文"
                                type="remailtxt"
                                id="remailtxt"
                                rows={10}
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRemailtxt(e.target.value) }}
                            />
                            <Button onClick={handleClose} fullWidth variant="contained" type='submit' disabled={!title || !title || !remail || !remail.match(/.+@.+\..+/)}>
                                投稿
                            </Button>
                        </Stack>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    )
}

const salarytypes = [
    { title: '時給', id: 1 },
    { title: '日給', id: 2 },
    { title: '月給', id: 3 },
    { title: '年収', id: 4 },
    { title: '週休', id: 5 },
]

export default QuestInput