import { Button, Dialog, DialogContent, DialogTitle, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Box, DialogContentText } from '@mui/material'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { db } from '../../firebase'
import AddIcon from '@mui/icons-material/Add'
import styles from "../../styles/Quest.module.scss"
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AdapterDateFns from '@date-io/date-fns'
import jaLocale from "date-fns/locale/ja"
import dayjs from 'dayjs'
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
    var limitdays = moment.utc().add(5, 'M')
    var limitdaysvalue = new Date(moment.utc().add(5, 'M').format())
    var mindays = moment()
    const [rlimit, setRlimit] = useState<null | any>(
        limitdaysvalue
    )
    const [recruit, setRecruit] = useState("")
    const [remail, setRemail] = useState("")
    const [remailtxt, setRemailtxt] = useState("")
    const [postmax, setPostMax] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [toukou, setToukou] = React.useState(false)
    const handleChangedays = (newValue: null) => {
        setRlimit(newValue)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    useEffect(() => {
        setPostcode(user.postcode)
        setAdd1(user.add1)
        setAdd2(user.add2)
        setRemail(user.email)
        setAdd3(user.add3)
    }, [])
    useEffect(() => {
        if (recruit) {
            setToukou(true)
        } else if (remail && remail.match(/.+@.+\..+/)) {
            setToukou(true)
        } else {
            setToukou(false)
        }
    })
    useEffect(() => {
        const data = async () => {
            const max = collection(db, "users", user.uid, "myposts")
            await getDocs(max).then((maxsnap) => {
                const size = maxsnap.size
                if (size <= 3) {
                    setPostMax(true)
                }
            })
        }
        data()
    }, [postmax])
    const sendQuest = async (e: React.FormEvent<HTMLFormElement>) => {
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
        }).then(async function (docQuest) {
            const docRef1 = doc(db, "users", user.uid, "myposts", docQuest.id)
            setDoc((docRef1), {
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
        setRlimit(limitdaysvalue)
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
                <DialogTitle>????????????</DialogTitle>
                <Box component="form" onSubmit={sendQuest} sx={{ fontSize: 15 }}>
                    <DialogContent>
                        <DialogContentText>
                            ???????????????3?????????
                        </DialogContentText>
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                value={title}
                                required
                                fullWidth
                                id="title"
                                label="????????????"
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
                                label="??????"
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
                                label="????????????"
                                name="postcode"
                                autoComplete="postcode"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPostcode(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add1}
                                fullWidth
                                id="add1"
                                label="????????????"
                                name="add1"
                                autoComplete="add1"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd1(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add2}
                                fullWidth
                                id="add2"
                                label="???????????????????????????"
                                name="add2"
                                autoComplete="add2"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd2(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={add3}
                                fullWidth
                                id="add3"
                                label="???????????????????????????"
                                name="add3"
                                autoComplete="add3"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdd3(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                value={jobname}
                                fullWidth
                                id="jobname"
                                label="?????????"
                                name="jobname"
                                autoComplete="jobname"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setJobname(e.target.value) }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">??????????????????</InputLabel>
                                <Select
                                    labelId="salarytype-label"
                                    id="salarytype"
                                    label="??????????????????"
                                    value={salarytype || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarytype(e.target.value) }}
                                >
                                    <MenuItem value={""}>????????????????????????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                    <MenuItem value={"??????"}>??????</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                value={salarymin}
                                fullWidth
                                id="salarymin"
                                label="????????????"
                                name="salarymin"
                                autoComplete="salarymin"
                                type="number"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarymin(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                value={salarymax}
                                id="salarymax"
                                label="????????????"
                                name="salarymax"
                                autoComplete="salarymax"
                                type="number"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSalarymax(e.target.value) }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">????????????</InputLabel>
                                <Select
                                    labelId="workingstatus-label"
                                    id="workingstatus"
                                    label="????????????"
                                    value={workingstatus || ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setWorkingstatus(e.target.value) }}
                                >
                                    <MenuItem value={""}>????????????????????????</MenuItem>
                                    <MenuItem value={"?????????"}>?????????</MenuItem>
                                    <MenuItem value={"???????????????????????????"}>???????????????????????????</MenuItem>
                                    <MenuItem value={"????????????"}>????????????</MenuItem>
                                    <MenuItem value={"????????????"}>????????????</MenuItem>
                                    <MenuItem value={"????????????????????????"}>????????????????????????</MenuItem>
                                    <MenuItem value={"??????????????????"}>??????????????????</MenuItem>
                                    <MenuItem value={"?????????"}>?????????</MenuItem>
                                    <MenuItem value={"?????????"}>?????????</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={jaLocale}>
                                <DesktopDatePicker
                                    label="????????????"
                                    inputFormat="MM/dd/yyyy"
                                    maxDate={limitdays}
                                    minDate={mindays}
                                    value={rlimit}
                                    onChange={handleChangedays}
                                    renderInput={(params) => <TextField {...params} helperText="????????????????????????5???????????????" />}
                                />
                            </LocalizationProvider>
                            <TextField
                                margin="normal"
                                fullWidth
                                value={recruit}
                                id="recruit"
                                label="?????????URL"
                                name="recruit"
                                autoComplete="recruit"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRecruit(e.target.value) }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="remail"
                                value={remail}
                                label="????????????????????????????????????????????????"
                                name="remail"
                                autoComplete="remail"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRemail(e.target.value) }}
                                helperText="?????????URL??????????????????????????????????????????????????????1????????????????????????????????????"
                            />
                            <TextField
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                value={remailtxt}
                                multiline
                                name="remailtxt"
                                label="??????????????????????????????"
                                type="remailtxt"
                                id="remailtxt"
                                rows={10}
                                autoComplete="current-password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRemailtxt(e.target.value) }}
                            />
                            <Button onClick={handleClose} fullWidth variant="contained" type='submit' disabled={!postmax || !title || !text || !toukou}>
                                {!postmax ?
                                    <>
                                        ??????????????????
                                    </>
                                    :
                                    <>
                                        ??????
                                    </>}
                            </Button>
                        </Stack>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    )
}

export default QuestInput