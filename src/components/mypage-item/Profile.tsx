import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth, db } from '../../firebase'
import { styled } from '@mui/material/styles';
const ValidationTextField = styled(TextField)({
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
    },
    '&:hover fieldset': {
        borderColor: 'yellow',
    },
});
const Profile: React.FC = () => {
    const user = useSelector(selectUser)
    const [profdisplayName, setProfdisplayName] = useState("")
    const [profcompany, setProfCompany] = useState("")
    const [proftel, setProfTel] = useState("")
    const [profpostcode, setProfPostcode] = useState("")
    const [profurl, setProfUrl] = useState("")
    const [profadd1, setProfAdd1] = useState("")
    const [profadd2, setProfAdd2] = useState("")
    const [profadd3, setProfAdd3] = useState("")
    const onProfCreate = (event: React.FormEvent<HTMLFormElement>) => {
        if (user.company && user.tel && user.postcode && user.add1 && user.add2 && user.add3) {
            event.preventDefault();
        }
        const unSub = onAuthStateChanged(auth, async (authUser) => {
            const docRef = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc((docRef), {
                    displayName: profdisplayName,
                    hpurl: profurl,
                    company: profcompany,
                    tel: proftel,
                    postcode: profpostcode,
                    add1: profadd1,
                    add2: profadd2,
                    add3: profadd3,
                })
            } else {
                await updateDoc((docRef), {
                    displayName: profdisplayName,
                    hpurl: profurl,
                    company: profcompany,
                    tel: proftel,
                    postcode: profpostcode,
                    add1: profadd1,
                    add2: profadd2,
                    add3: profadd3,
                })
            }
        })
        return () => {
            unSub()
        }
    }
    useEffect(() => {
        setProfdisplayName(user.displayName)
        setProfUrl(user.hpurl)
        setProfCompany(user.company)
        setProfTel(user.tel)
        setProfPostcode(user.postcode)
        setProfAdd1(user.add1)
        setProfAdd2(user.add2)
        setProfAdd3(user.add3)
    }, [])
    console.log(profurl)
    return (
        <>
            <Box component="form" onSubmit={onProfCreate}>
                <Box className="input_box">
                    <ValidationTextField
                        margin="normal"
                        defaultValue={user.company}
                        required
                        fullWidth
                        id="company"
                        label="会社名"
                        name="company"
                        autoComplete="company"
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfCompany(e.target.value) }}
                    />
                    <TextField
                        margin="normal"
                        defaultValue={user.displayName}
                        fullWidth
                        id="displayName"
                        label="担当者名"
                        name="displayName"
                        autoComplete="displayName"
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfdisplayName(e.target.value) }}
                    />
                    <TextField
                        margin="normal"
                        defaultValue={user.hpurl}
                        fullWidth
                        id="hpurl"
                        label="会社ホームページ"
                        name="hpurl"
                        autoComplete="hpurl"
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfUrl(e.target.value) }}
                    />
                    <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="tel"
                        label="電話番号"
                        name="tel"
                        autoComplete="tel"
                        autoFocus
                        defaultValue={user.tel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfTel(e.target.value) }}
                    />
                    <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="postcode"
                        label="郵便番号"
                        name="postcode"
                        autoComplete="postcode"
                        autoFocus
                        defaultValue={user.postcode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfPostcode(e.target.value) }}
                    />
                    <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="add1"
                        label="都道府県"
                        name="add1"
                        autoComplete="add1"
                        autoFocus
                        defaultValue={user.add1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfAdd1(e.target.value) }}
                    />
                    <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="add2"
                        label="住所（市区）"
                        name="add2"
                        autoComplete="add2"
                        defaultValue={user.add2}
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfAdd2(e.target.value) }}
                    />
                    <ValidationTextField
                        margin="normal"
                        required
                        fullWidth
                        id="add3"
                        label="住所の詳細"
                        name="add3"
                        autoComplete="add3"
                        defaultValue={user.add3}
                        autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setProfAdd3(e.target.value) }}
                    />
                </Box>
                <Button
                    className='bt'
                    type='submit'
                    variant="contained"
                    disabled={!profcompany || !proftel || !profpostcode || !profadd1 || !profadd2 || !profadd3}
                >
                    {user.company && user.tel && user.postcode && user.add1 && user.add2 && user.add3 ? "更新" : "次へ"}
                </Button>
            </Box>
        </>
    )
}

export default Profile