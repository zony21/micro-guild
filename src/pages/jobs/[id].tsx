import styles from '../../styles/Jobs.module.scss'
import Layout from '../../components/Layout'
import Head from 'next/head'
import PaymentsIcon from '@mui/icons-material/Payments'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import PlaceIcon from '@mui/icons-material/Place'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ScheduleIcon from '@mui/icons-material/Schedule'
import FlagIcon from '@mui/icons-material/Flag';
import { db } from '../../lib/db'
import admin from 'firebase-admin'
import moment from 'moment'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { auth } from '../../firebase'
import Report from '../../components/Report'

const Jobs: React.FC = ({ item, user, postid }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [avimg, setAvimg] = useState("")
    const [limit, setLimit] = useState(false)
    const limitday = new Date(item.rlimit)
    const today = new Date()
    const [open, setOpen] = useState(false)
    const prof = auth.currentUser
    const [reportopen, setReportOpen] = useState(false)
    const onEmailopen = () => {
        setOpen(true);
    }
    const onEmailclose = () => {
        setOpen(false);
    }
    const handleClickOpen = () => {
        setReportOpen(true);
    }
    useEffect(() => {
        if (limitday <= today) {
            setLimit(true)
        }
    }, [])
    return (
        <>
            <Head>
                <title>Micro Guild | {item.title}の求人情報</title>
            </Head>
            <Layout>
                <div className={styles.job_wrap}>
                    <article className={styles.job_detail}>
                        <div className={styles.job_detail_main}>
                            <div className={styles.job_detail_panel}>
                                <section className={styles.job_detail_bt}>
                                    {limit! ? (
                                        <>
                                            <div className={`${styles.jobs_bt_limit_txt}`}>
                                                掲載終了しました
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`${styles.jobs_bt_wrap} bt_wrap`}>
                                                {item.recruit ? (
                                                    <div className={`${styles.url_bt} bt`}><a href={item.recruit} className="bt_link" target="_blank" rel="noopener">掲載元で応募する</a></div>
                                                ) : ""}
                                                {item.remail ? (
                                                    item.remailtxt ? (
                                                        <div className={`${styles.email_bt} bt`}>
                                                            <button onClick={onEmailopen} className="bt_link">メールで応募する</button>
                                                        </div>
                                                    ) :
                                                        (<div className={`${styles.email_bt} bt`}>
                                                            <a href={`mailto:${item.remail}`} className="bt_link">メールで応募する</a>
                                                        </div>)
                                                ) : ""}
                                            </div>
                                        </>
                                    )
                                    }
                                </section>
                                <section className={styles.job_detail_tl}>
                                    <div className={`${styles.date_tags} ${styles.icon_txt}`}>
                                        <span className={styles.icon}><ScheduleIcon sx={{ width: 20, height: 20, color: "#db8c6c" }} /></span>
                                        <span className={styles.txt}>{moment(item.timestamp).format('YYYY/MM/DD')}</span>
                                    </div>
                                    <h1 className={`${styles.job_detail_tl_h1}`}>{item.title}</h1>
                                    <div className={`${styles.tl_company} ${styles.icon_txt}`}>
                                        <div className={`${styles.tl_company_icon} ${styles.icon}`}><Avatar sx={{ width: 26, height: 26 }} src={user.userUrl} /></div>
                                        <div className={`${styles.tl_company_name} ${styles.txt}`}>{user.company}</div>
                                    </div>
                                    <ul className={styles.job_detail_summary}>
                                        <li className={styles.icon_txt}>
                                            <span className={styles.icon}><PaymentsIcon sx={{ width: 20, height: 20, color: "#db8c6c" }} /></span>
                                            <span className={styles.txt}>{item.salarytype} {item.salarymax === item.salarymin || !item.salarymax || !item.salarymin ? <>{item.salarymin ? `¥${item.salarymin}` : ""}{item.salarymin ? "~" : ""}{item.salarymax ? "~" : ""} {item.salarymax ? `¥${item.salarymax}` : ""}</> : <>{item.salarymin ? `¥${item.salarymin}` : ""} ~ {item.salarymax ? `¥${item.salarymax}` : ""}</>}</span>
                                        </li>
                                        <li className={styles.icon_txt}>
                                            <span className={styles.icon}><PlaceIcon sx={{ width: 20, height: 20, color: "#db8c6c" }} /></span>
                                            <span className={styles.txt}>{item.add1}{item.add2}{item.add3}</span>
                                        </li>
                                        <li className={styles.icon_txt}>
                                            <span className={styles.icon}><EventAvailableIcon sx={{ width: 20, height: 20, color: "#db8c6c" }} /></span>
                                            <span className={styles.txt}>掲載期限 ~{moment(item.rlimit).format('YYYY/MM/DD')}</span>
                                        </li>
                                    </ul>
                                </section>
                                <section className={styles.job_detail_centent}>
                                    <h2 className={`com_h2 ${styles.job_detail_h2}`}>仕事内容</h2>
                                    <div className={`${styles.job_detail_centent_txt} txt`}>{item.text.split('\n').map((t, index) => (
                                        <span key={index}>{t}<br /></span>
                                    ))}</div>
                                </section>
                                <section className={styles.job_detail_info}>
                                    <h2 className={`com_h2 ${styles.job_detail_h2}`}>募集情報</h2>
                                    <ul className={`${styles.job_detail_info_ul}`}>
                                        <li className={`${styles.job_detail_info_ul_li}`}>
                                            <h3 className={`${styles.job_detail_h3}`}>職種名</h3>
                                            <div className={`${styles.job_detail_txt} txt`}>{item.jobname}</div>
                                        </li>
                                        <li className={`${styles.job_detail_info_ul_li}`}>
                                            <h3 className={`${styles.job_detail_h3}`}>勤務地</h3>
                                            <div className={`${styles.job_detail_txt} txt`}>
                                                <span className={`${styles.job_detail_postcode}`}>〒{item.postcode}</span>
                                                {item.add1}{item.add2}{item.add3}
                                            </div>
                                        </li>
                                        <li className={`${styles.job_detail_info_ul_li}`}>
                                            <h3 className={`${styles.job_detail_h3}`}>給与</h3>
                                            <div className={`${styles.job_detail_txt} txt`}>
                                                {item.salarytype} {item.salarymax === item.salarymin || !item.salarymax || !item.salarymin ? <>{item.salarymin ? `¥${item.salarymin}` : ""}{item.salarymin ? "~" : ""}{item.salarymax ? "~" : ""} {item.salarymax ? `¥${item.salarymax}` : ""}</> : <>{item.salarymin ? `¥${item.salarymin}` : ""} ~ {item.salarymax ? `¥${item.salarymax}` : ""}</>}
                                            </div>
                                        </li>
                                        <li className={`${styles.job_detail_info_ul_li}`}>
                                            <h3 className={`${styles.job_detail_h3}`}>雇用形態</h3>
                                            <div className={`${styles.job_detail_txt} txt`}>
                                                {item.workingstatus}
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                                <section className={styles.job_detail_company}>
                                    <h2 className={`com_h2 ${styles.job_detail_h2}`}>会社名</h2>
                                    <div className={`${styles.icon_txt}`}>
                                        <div className={`${styles.icon}`}><Avatar sx={{ width: 50, height: 50 }} src={user.userUrl} /></div>
                                        <div className={`${styles.txt}`}>
                                            <div className={`${styles.job_detail_company_name}`}>
                                                {user.company}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.job_detail_company_adress_box}`}>
                                        <div className={`${styles.job_detail_company_adress_code}`}>
                                            〒{user.postcode}
                                        </div>
                                        <div className={`${styles.job_detail_company_adress}`}>
                                            {user.add1}{user.add2}{user.add3}
                                        </div>
                                    </div>
                                    <div className={`${styles.job_detail_company_bt}`}>
                                        {user.hpurl ? (
                                            <>
                                                <div className={`bt ${styles.hpurl_bt}`}><a href={user.hpurl} className="bt_link" target="_blank" rel="noopener">会社ホームページ</a></div>
                                            </>
                                        ) : ""}
                                    </div>
                                </section>
                            </div>
                            <section className={styles.job_report}>
                                <button className={styles.report_button} onClick={handleClickOpen}>
                                    <FlagIcon sx={{ width: 30, height: 30, color: "#db8c6c" }} /><span>この求人情報を報告する</span>
                                </button>
                            </section>
                        </div>
                        <div className={styles.job_detail_slider}>

                        </div>
                    </article>
                </div>
            </Layout>
            <Dialog open={open} onClose={onEmailclose} fullWidth>
                <DialogTitle><h2 className={``}>注意事項</h2></DialogTitle>
                <DialogContent>
                    <DialogContentText className='txt'>
                        {item.remailtxt}
                    </DialogContentText>
                    <div className={`${styles.email_bt} bt ${styles.dialog_bt}`}>
                        <a href={`mailto:${item.remail}`} className="bt_link">メールで応募する</a>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onEmailclose}>キャンセル</Button>
                </DialogActions>
            </Dialog>
            <Report id={postid} title={item.title} userid={item.userid} reportopen={reportopen} setReportOpen={setReportOpen} />
        </>
    )
}

export default Jobs

export const getServerSideProps: GetServerSideProps<{
    item: FirebaseFirestore.DocumentData,
    user: FirebaseFirestore.DocumentData,
    postid: FirebaseFirestore.DocumentData
}> = async (context) => {
    const { id } = context.query
    const postidRef = id
    const postid = JSON.parse(JSON.stringify(postidRef))
    const colRef = db.collection('posts')
    const snapShot = await colRef.where(admin.firestore.FieldPath.documentId(), '==', id).get()
    const data = snapShot.docs[0].data()
    const item = JSON.parse(JSON.stringify(data))
    const usercol = db.collection('users')
    const usersnap = await usercol.where(admin.firestore.FieldPath.documentId(), '==', item.userid).get()
    const userdata = usersnap.docs[0].data()
    const user = JSON.parse(JSON.stringify(userdata))
    return {
        props: {
            item,
            user,
            postid
        },
    }
}