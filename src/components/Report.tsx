import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import emailjs from '@emailjs/browser'

const Report = (props) => {
    const reportitems = [
        {
            id: 'report1',
            txt: 'この求人情報はスパム、不正行為、または不適切です',
        }, {
            id: 'report2',
            txt: 'この求人はすでに存在しません',
        }, {
            id: 'report3',
            txt: 'この応募先ページはすでに存在していません',
        }, {
            id: 'report4',
            txt: 'この求人は虚偽的な方法や危害を助長したり引き起こしたりする内容を含んでいる',
        }, {
            id: 'report5',
            txt: 'その他',
        }
    ]
    const [reporttxt, setReporttxt] = useState("")
    const [reporttype, setReportType] = useState("")
    const handleClose = () => {
        props.setReportOpen(false)
        setReportType("")
        setReporttxt("")
    }
    const onreportChange = (e) => {
        setReportType(e.target.value)
    }
    const onReportsubmit = async () => {
        await addDoc(collection(db, "reports"), {
            postID: props.userid,
            type: reporttype,
            text: reporttxt
        })

        const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const emailjsUserid = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        const templateParams = {
            job_link: props.id,
            job_title: props.title,
            report_type: reporttype,
            message: reporttxt,
        }
        emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams, emailjsUserid)
            .then((result) => {
                alert("報告が完了いたしました。ご協力ありがとうございます。")
            }, (error) => {
                alert(`送信できませんでした：${error.text}`)
            })
        props.setReportOpen(false)
        setReportType("")
        setReporttxt("")
    }
    return (
        <>
            <Dialog
                open={props.reportopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ご意見をお聞かせください
                </DialogTitle>
                <DialogContent>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">報告内容</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {reportitems.map((item) => {
                                return (
                                    <FormControlLabel key={item.id} value={item.txt} control={<Radio />} label={item.txt} onChange={onreportChange} />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="standard-basic"
                        label="報告の詳細"
                        helperText="ご記入は任意です"
                        variant="standard"
                        fullWidth
                        value={reporttxt}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setReporttxt(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={onReportsubmit} variant="contained" disabled={!reporttype}>
                        送信
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Report