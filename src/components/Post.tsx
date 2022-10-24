import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from "../styles/Post.module.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useRouter } from 'next/router';
import moment from 'moment';

const Post = (props) => {
    const router = useRouter()
    const user = useSelector(selectUser)
    const [passlink, setPasslink] = useState(false)
    const [posetopen, setPosetope] = useState(false)
    const [postcllset, setPostcllset] = useState(false)
    const [postid, setPostId] = useState(false)
    const [limit, setLimit] = useState(false)
    const limitday = new Date(props.rlimit)
    const today = new Date()
    if (props.rlimit.seconds) {
        var limittxt = `掲載期限 ${moment(moment.unix(props.rlimit.seconds).toDate()).format('YYYY/MM/DD')}まで`
    } else {
        var limittxt = `掲載期限 ${moment(moment.unix(props.rlimit._seconds).toDate()).format('YYYY/MM/DD')}まで`
    }
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
            await deleteDoc(doc(db, "users", props.userid, "myposts", props.id));
        }
    }
    useEffect(() => {
        const pass = window.location.pathname
        if (pass != "/mypage/home") {
            setPasslink(true)
        }
        if (limitday <= today) {
            setLimit(true)
        }
        if (props.userid != user.uid) {
            setPostId(true)
        }
    }, [])
    return (
        <>
            <div className={`${styles.posts_item} ${limit ? "" : styles.link} post_com`}>
                {limit ? (
                    <>
                        <div className={styles.limit_close}>
                            <div className={`txt ${styles.limit_close_txt}`}>掲載終了しました</div>
                        </div>
                        <div>
                            <h2 className={styles.tl}>{props.title}</h2>
                            <div className={styles.txt_box}>
                                {props.rlimit ? (
                                    <div className={styles.limit_txt}>{limittxt}</div>
                                ) : ""}
                                <div className={styles.add}>{props.add1}{props.add2}{props.add3}</div>
                                <div className={styles.metadata}>
                                    <div className={styles.salary_snippet}>{props.salarytype} {props.salarymax === props.salarymin || !props.salarymax || !props.salarymin ? <>{props.salarymax}{props.salarymin}</> : <>{props.salarymin} ~ {props.salarymax}</>}</div>
                                </div>
                                <div className={styles.metadata}>{props.workingstatus}</div>
                                <div className={styles.job_snippet}>
                                    <p>{props.text}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (<>
                    <Link href={`../jobs/${props.id}`}>
                        <a>
                            <h2 className={styles.tl}>{props.title}</h2>
                            <div className={styles.txt_box}>
                                {props.rlimit ? (
                                    <div className={styles.limit_txt}>{limittxt}</div>
                                ) : ""}
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
                </>)}
                {postid || passlink ? (
                    ""
                ) :
                    <div className={styles.post_set} id={`post_set_${props.id}`}>
                        <button onClick={onSetpoup} className={limit ? styles.limit_over_icon : styles.post_set_icon}><MoreHorizIcon /></button>
                        {posetopen ? (
                            <ul className={postcllset ? styles.post_set_right : styles.post_set_left}>
                                <li>
                                    <button className={styles.close} onClick={onDelete}>削除</button>
                                </li>
                            </ul>
                        ) : ""}
                        {posetopen ? (
                            <>
                                <div className={styles.post_set_close} onClick={onSetpoupclose}></div>
                            </>
                        ) : ""}
                    </div>
                }
            </div>
        </>
    )
}

export default Post