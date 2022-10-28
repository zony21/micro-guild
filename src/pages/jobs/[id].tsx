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
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import Report from '../../components/Report'
import emailjs from '@emailjs/browser'
import Link from 'next/link'
import Post from '../../components/Post'

export const getServerSideProps: GetServerSideProps<{
    item: FirebaseFirestore.DocumentData,
    user: FirebaseFirestore.DocumentData,
    postid: FirebaseFirestore.DocumentData,
    postsdata: FirebaseFirestore.DocumentData
    id
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
    let posts = []
    try {
        const querySnapshot = await db.collection('posts').orderBy('timestamp', 'desc').limit(3).where('userid', '==', item.userid).get()
        querySnapshot.forEach(function (doc) {
            posts.push({
                id: doc.id,
                title: doc.data().title,
                text: doc.data().text,
                postcode: doc.data().postcode,
                add1: doc.data().add1,
                add2: doc.data().add2,
                add3: doc.data().add3,
                jobname: doc.data().jobname,
                salarytype: doc.data().salarytype,
                salarymin: doc.data().salarymin,
                salarymax: doc.data().salarymax,
                workingstatus: doc.data().workingstatus,
                rlimit: doc.data().rlimit,
                remail: doc.data().remail,
                remailtxt: doc.data().remailtxt,
                timestamp: doc.data().timestamp,
                userid: doc.data().userid,
                recruit: doc.data().recruit,
                username: doc.data().username
            })
        })
    } catch (error) {
        console.log(`Error getting documents: ${error}`)
    }
    const postsdata = await JSON.parse(JSON.stringify(posts))
    return {
        props: {
            item,
            user,
            postid,
            postsdata,
            id
        },
    }
}

const Jobs: React.FC = ({ item, user, postid, postsdata, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [isHeightOver, setIsHeightOver] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const scrollAction = () => {
                if (900 > window.document.body.offsetHeight - window.scrollY) {
                    setIsHeightOver(true)
                } else {
                    setIsHeightOver(false)
                }
            }
            window.addEventListener("scroll", scrollAction, {
                capture: false,
                passive: true,
            })
            scrollAction()

            return () => {
                window.removeEventListener("scroll", scrollAction)
            }
        }
    }, [])
    const [limit, setLimit] = useState(false)
    const limitday = new Date(item.rlimit)
    const today = new Date()
    const [open, setOpen] = useState(false)
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
    const metatitle = `Micro Guild | ${item.title}の求人情報`
    useEffect(() => {
        if (limitday <= today) {
            setLimit(true)
        }
    }, [])
    switch (item.workingstatus) {
        case "正社員":
            var employment = "FULL_TIME"
            break;
        case "パート・アルバイト":
            var employment = "PART_TIME"
            break;
        case "契約社員":
            var employment = "CONTRACTOR"
            break;
        case "派遣社員":
            var employment = "TEMPORARY"
            break;
        case "インターンシップ":
            var employment = "INTERN"
            break;
        case "ボランティア":
            var employment = "VOLUNTEER"
            break;
        case "日雇い":
            var employment = "PER_DIEM"
            break;
        case "その他":
            var employment = "OTHER"
            break;
        default:
            break;
    }
    switch (item.salarytype) {
        case "時給":
            var unit = "HOUR"
            break;
        case "日給":
            var unit = "DAY"
            break;
        case "週休":
            var unit = "WEEK"
            break;
        case "月給":
            var unit = "MONTH"
            break;
        case "年収":
            var unit = "YEAR"
            break;
        default:
            break;
    }
    const googleforjobs = {
        "@context": "http://schema.org/",
        "@type": "JobPosting",
        "title": item.title,
        "description": `<p><strong>${item.text}</strong></p>`,
        "datePosted": today,
        "validThrough": moment.unix(item.rlimit?._seconds),
        "employmentType": employment,
        "hiringOrganization": {
            "@type": "Organization",
            "name": user.company,
            "sameAs": user.hpurl
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressRegion": item.add1,
                "addressLocality": item.add2,
                "streetAddress": item.add3,
                "postalCode": item.postcode,
                "addressCountry": "JP"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "JPY",
            "value": {
                "@type": "QuantitativeValue",
                "value": item.salarymin,
                "minValue": item.salarymin,
                "maxValue": item.salarymax,
                "unitText": unit
            }
        }
    }
    const sex = [
        {
            id: 'sex1',
            txt: '指定しない',
        }, {
            id: 'sex2',
            txt: '男性',
        }, {
            id: 'sex3',
            txt: '女性',
        }
    ]
    const [appcname, setAppcname] = useState("")
    const [appcnamekana, setAppcnamekana] = useState("")
    const [sextype, setSextype] = useState("指定しない")
    const [appcmail, setAppcmail] = useState("")
    const [appctel, setAppctel] = useState("")
    const [appcmess, setAppcmess] = useState("")
    const [appcage, setAppcage] = useState("")
    const [appcadd, setAppcadd] = useState("")
    const onsexChange = (e) => {
        setSextype(e.target.value)
    }
    const onRecruitsubmit = () => {
        const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2
        const emailjsUserid = process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        const templateParams = {
            useremail: item.remail,
            title: item.title,
            linkid: id,
            name: appcname,
            namekana: appcnamekana,
            gender: sextype,
            email: appcmail,
            tel: appctel,
            message: appcmess,
            add: appcadd,
            age: appcage
        }
        var result = confirm('応募しますか？')
        if (result) {
            emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams, emailjsUserid)
                .then((result) => {
                    alert("応募が完了しました。")
                    setAppcname("")
                    setAppcnamekana("")
                    setSextype("指定しない")
                    setAppcmail("")
                    setAppctel("")
                    setAppcmess("")
                    onEmailclose()
                }, (error) => {
                    alert(`送信できませんでした：${error.text}`)
                })
        }
    }
    return (
        <>
            <Head>
                <title>{metatitle}</title>
                <script type="application/ld+json">
                    {JSON.stringify(googleforjobs)}
                </script>
            </Head>
            <Layout>
                <div className={styles.job_wrap}>
                    <article className={styles.job_detail}>
                        <div className={styles.job_detail_main}>
                            <div className={styles.job_detail_panel}>
                                <section className={`${styles.job_detail_bt} ${isHeightOver ? "" : `${styles.job_detail_bt_on}`}`} >
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
                                                    <div className={`${styles.email_bt} bt`}>
                                                        <button onClick={onEmailopen} className="bt_link">フォームから応募する</button>
                                                    </div>
                                                ) : ""}
                                            </div>
                                        </>
                                    )
                                    }
                                </section>
                                <section className={styles.job_detail_tl}>
                                    <div className={`${styles.date_tags} ${styles.icon_txt}`}>
                                        <span className={styles.icon}><ScheduleIcon sx={{ width: 20, height: 20, color: "#db8c6c" }} /></span>
                                        <span className={styles.txt}>{moment.unix(item.timestamp?._seconds).format('YYYY/MM/DD')}</span>
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
                                            <span className={styles.txt}>掲載期限 ~{moment.unix(item.rlimit?._seconds).format('YYYY/MM/DD')}</span>
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
                                    <h2 className={`com_h2 ${styles.job_detail_h2}`}>会社情報</h2>
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
                            <div className={`${styles.job_detail_slider_tags_box} ${styles.job_detail_slider_box}`}>
                                <h3 className={styles.job_detail_slider_tl}>関連キーワード</h3>
                                <ul className={styles.job_detail_slider_tags}>
                                    <li className={styles.job_detail_slider_tag}>
                                        <Link href={`/jobs/search?area=&s=&jparea=${user.add1}&unit=&employment=&mun=`}><a>{user.add1}</a></Link>
                                    </li>
                                    <li className={styles.job_detail_slider_tag}>
                                        <Link href={`/jobs/search?area=&s=&jparea=${user.add1}&unit=&employment=&mun=${user.add2}`}><a>{user.add1} {user.add2}</a></Link>
                                    </li>
                                    <li className={styles.job_detail_slider_tag}>
                                        <Link href={`/jobs/search?area=&s=${item.jobname}&unit=&employment=&jparea=${user.add1}&mun=${user.add2}`}><a>{item.jobname}</a></Link>
                                    </li>
                                    <li className={styles.job_detail_slider_tag}>
                                        <Link href={`/jobs/search?area=&s=&jparea=${user.add1}&unit=&mun=${user.add2}&employment=${item.workingstatus}`}><a>{item.workingstatus}</a></Link>
                                    </li>
                                    <li className={styles.job_detail_slider_tag}>
                                        <Link href={`/jobs/search?area=&s=&jparea=${user.add1}&employment=&mun=${user.add2}&unit=${item.salarytype}`}><a>{item.salarytype}</a></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={`${styles.job_detail_slider_otherpost_box} ${styles.job_detail_slider_box}`}>
                                <h3 className={styles.job_detail_slider_tl}>{user.company}の求人</h3>
                                <div className={`${styles.job_detail_slider_otherposts}`}>
                                    {
                                        postsdata.map((post) => {
                                            return (
                                                <div
                                                    className={`${styles.job_detail_slider_otherpost}`}
                                                    key={post.id}
                                                >
                                                    <Post
                                                        id={post.id}
                                                        title={post.title}
                                                        text={post.text}
                                                        add1={post.add1}
                                                        add2={post.add2}
                                                        add3={post.add3}
                                                        salarytype={post.salarytype}
                                                        salarymax={post.salarymax}
                                                        salarymin={post.salarymin}
                                                        workingstatus={post.workingstatus}
                                                        userid={post.userid}
                                                        rlimit={post.rlimit}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </Layout >
            <Dialog open={open} onClose={onEmailclose} fullWidth>
                <DialogTitle><h2 className={``}>応募フォーム</h2></DialogTitle>
                <DialogContent>
                    {item.remailtxt ? (
                        <DialogContentText className='txt'>
                            <h3>注意事項</h3>
                            {item.remailtxt}
                        </DialogContentText>
                    ) : ""}
                    <br />
                    <TextField
                        id="standard-basic"
                        label="お名前"
                        variant="outlined"
                        fullWidth
                        required
                        value={appcname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcname(e.target.value) }}
                    />
                    <TextField
                        id="standard-basic"
                        margin="normal"
                        label="お名前(かな)"
                        required
                        variant="outlined"
                        fullWidth
                        value={appcnamekana}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcnamekana(e.target.value) }}
                    />
                    <FormControl margin="normal">
                        <FormLabel id="demo-radio-buttons-group-label">性別</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {sex.map((item) => {
                                return (
                                    <FormControlLabel key={item.id} value={item.txt} control={<Radio />} label={item.txt} onChange={onsexChange} checked={sextype === item.txt} />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="standard-basic"
                        margin="normal"
                        label="生年月日"
                        variant="outlined"
                        helperText="例)2000/01/01"
                        required
                        fullWidth
                        value={appcage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcage(e.target.value) }}
                    />
                    <TextField
                        id="standard-basic"
                        margin="normal"
                        label="メールアドレス"
                        variant="outlined"
                        required
                        fullWidth
                        value={appcmail}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcmail(e.target.value) }}
                    />
                    <TextField
                        id="standard-basic"
                        margin="normal"
                        label="電話番号"
                        helperText="09010102020"
                        required
                        variant="outlined"
                        fullWidth
                        value={appctel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppctel(e.target.value) }}
                    />
                    <TextField
                        id="standard-basic"
                        margin="normal"
                        label="住所"
                        required
                        variant="outlined"
                        fullWidth
                        value={appcadd}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcadd(e.target.value) }}
                    />
                    <TextField
                        margin="normal"
                        variant="outlined"
                        value={appcmess}
                        fullWidth
                        multiline
                        name="text"
                        label="備考"
                        type="text"
                        id="text"
                        rows={10}
                        autoComplete="current-password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAppcmess(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onEmailclose}>キャンセル</Button>
                    <Button
                        onClick={onRecruitsubmit}
                        variant="contained"
                        disabled={!appcname || !appcnamekana || !appcmail || !appctel}
                    >
                        応募する
                    </Button>
                </DialogActions>
            </Dialog>
            <Report id={postid} title={item.title} userid={item.userid} reportopen={reportopen} setReportOpen={setReportOpen} />
        </>
    )
}

export default Jobs