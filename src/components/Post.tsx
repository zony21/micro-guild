import Link from 'next/link'
import React, { useState } from 'react'
import styles from "../styles/Post.module.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

const Post = (props) => {
    const user = useSelector(selectUser)
    const [posetopen, setPosetope] = useState(false)
    const [postcllset, setPostcllset] = useState(false)

    const onSetpoup = () => {
        setPosetope(true)
        const getRect = document.getElementById(`post_set_${props.id}`)
        const windoww = window.innerWidth
        const postadd = getRect.getBoundingClientRect().right
        const postset = windoww - postadd
        if (postset < 100) {
            setPostcllset(true)
        }
    }
    const onSetpoupclose = () => {
        setPosetope(false)
    }
    const onDelete = async () => {
        var result = confirm('削除すると元には戻せません、本当に削除しますか？');
        if (result) {
            await deleteDoc(doc(db, "posts", props.id));
        }
    }
    return (
        <>
            <li className={styles.posts_item}>
                <div className={styles.post_set} id={`post_set_${props.id}`}>
                    <button onClick={onSetpoup} className={styles.post_set_icon}><MoreHorizIcon /></button>
                    {posetopen ? (
                        <ul className={postcllset ? styles.post_set_right : styles.post_set_left}>
                            <li>
                                <button className={styles.close} onClick={onDelete}>削除</button>
                            </li>
                            {!user.uid ? (
                                <li>
                                    <button>報告</button>
                                </li>
                            ) : ""}
                        </ul>
                    ) : ""}
                    {posetopen ? (
                        <>
                            <div className={styles.post_set_close} onClick={onSetpoupclose}></div>
                        </>
                    ) : ""}
                </div>
                <Link href={`../jobs/${props.id}`}>
                    <a>
                        <div className={styles.tl}>{props.title}</div>
                        <div className={styles.txt_box}>
                            <div className={styles.add}>{props.add1}{props.add2}{props.add3}</div>
                            <div className={styles.metadata}>
                                <div className={styles.salary_snippet}>{props.salarytype} {props.salarymax === props.salarymin || !props.salarymax || !props.salarymin ? <>{props.salarymax}{props.salarymin}</> : <>{props.salarymin} ~ {props.salarymax}</>}</div>
                            </div>
                            <div className={styles.metadata}>{props.workingstatus}</div>
                            <div className={styles.job_snippet}>
                                <p>{props.text}</p>
                            </div>
                        </div>
                    </a>
                </Link>
            </li>
        </>
    )
}

export default Post