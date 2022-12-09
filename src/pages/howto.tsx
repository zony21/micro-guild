import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Howto.module.scss'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CreateIcon from '@mui/icons-material/Create'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Howto = () => {
    const howtoflows = [
        {
            id: 1,
            title: <>
                無料で掲載アカウント作成、<br />
                掲載費用<span>0</span>円、成果報酬<span>0</span>円
            </>,
            content: <>
                <p className="txt">右上の「求人募集」ボタンまたは下のボタンからログイン画面へ移動、<br />無料新規登録をクリックして必要事項を入力します。</p>
                <div className={`${styles.howto_signin_bt} bt`}>
                    <Link href="/mypage/home">
                        <a className={`${styles.bt_link}`}><span>無料会員登録</span><ArrowForwardIcon /></a>
                    </Link>
                </div>
            </>,
            img: "/img/howto/flow_img1.png",
            imgalt: "ログイン画面"
        },
        {
            id: 2,
            title: <>
                企業情報(アカウント情報)を<br />
                かんたん設定
            </>,
            content: <>
                <p className="txt">全8項目（うち必須項目は6項目）を入力して企業情報を設定します。<br />企業情報を設定後投稿用管理画面に移動します。<br />企業情報は求人情報を掲載時にメールアドレス・住所・電話番号の初期設定として使用します。<br />また求人情報を投稿した企業として求人情報詳細ページにて内容が表示されます。<br /><span className={`${styles.howto_txt_tyu}`}>※担当者名は求人情報詳細ページに表示されません。</span></p>
            </>,
            img: "/img/howto/flow_img2.png",
            imgalt: "企業情報画面"
        },
        {
            id: 3,
            title: <>
                求人情報を登録する
            </>,
            content: <>
                <p className="txt">管理画面右下にある＋ボタンをクリックすると求人投稿フォームが表示されます。<br />画面案内に従って求人の基本情報を登録します。本サイトでは、以下の項目が登録できます。</p>
                <ul>
                    <li>タイトル(必須)</li>
                    <li>本文(必須)</li>
                    <li>郵便番号<span>初期値に企業情報を使用します</span></li>
                    <li>都道府県<span>初期値に企業情報を使用します</span></li>
                    <li>勤務地住所(市区)<span>初期値に企業情報を使用します</span></li>
                    <li>勤務地住所(詳細)<span>初期値に企業情報を使用します</span></li>
                    <li>職種名</li>
                    <li>給与額区分<span>(時給/日給/週休/月給/年収)</span></li>
                    <li>給与下限</li>
                    <li>給与上限</li>
                    <li>雇用形態<span>(正社員/パート・アルバイト/契約社員/派遣社員/インターンシップ/ボランティア/日雇い/その他)</span></li>
                    <li>投稿期限<span>上限は5ヶ月間です</span></li>
                    <li>応募先URL<span>自社サイトなどすでに窓口がある場合に使用してください</span></li>
                    <li>応募フォーム送り先メールアドレス<span>初期値に企業情報を使用します</span></li>
                    <li>応募フォーム用注意文<span>応募フォーム送り先メールアドレス登録時に応募する際の注意文を登録できます</span></li>
                </ul>
            </>,
            img: "/img/howto/flow_img3.png",
            imgalt: "求人投稿フォームポップアップ"
        },
        {
            id: 4,
            title: <>
                Micro GuildとGoogleしごと検索に<br />掲載開始
            </>,
            content: <>
                <p className="txt">入力した内容に問題がなければ、求人投稿フォームの投稿ボタンをクリックすることで掲載開始になります。<br />投稿された求人は管理画面のホームから確認できます。<br />また「Googleしごと検索(Google for jobs)」への掲載には数日かかります。</p>
            </>,
            img: "/img/howto/flow_img4.png",
            imgalt: "管理画面ホーム"
        }
    ]
    const howtoflowbts = [
        {
            id: 1,
            icon: <><AccountCircleIcon /></>,
            tl: "会員登録(無料)"
        },
        {
            id: 2,
            icon: <><ApartmentIcon /></>,
            tl: "企業情報登録"
        },
        {
            id: 3,
            icon: <><CreateIcon /></>,
            tl: "投稿内容入力"
        },
        {
            id: 4,
            icon: <><DomainVerificationIcon /></>,
            tl: "掲載開始"
        }
    ]
    const comparisons = [
        {
            id: 1,
            img: "/img/common/googleforjobs.png",
            tl: "Gppgleしごと検索へ掲載",
            txt: "投稿した求人情報はGoogle仕事検索(Google for jobs)に対応します。",
            imgalt: "Gppgleしごと検索",
            inyo: "https://jobs.google.com/about/intl/ja_ALL/"
        }, {
            id: 2,
            img: "/img/howto/comparison_img5.jpg",
            tl: "企業情報編集",
            txt: "管理画面の左メニュー欄の企業情報より変更できます。",
            imgalt: "企業情報編集画面",
            inyo: ""
        }, {
            id: 3,
            img: "/img/howto/comparison_img1.jpg",
            tl: "アイコン画像登録",
            txt: "アカウント登録時または管理画面の左メニュー欄のアカウントより変更できます。",
            imgalt: "アイコン画像登録画面",
            inyo: ""
        }, {
            id: 4,
            img: "/img/howto/comparison_img2.jpg",
            tl: "メールアドレス・パスワード変更",
            txt: "管理画面の左メニュー欄のアカウントより変更できます。",
            imgalt: "メールアドレス・パスワード変更画面",
            inyo: ""
        }, {
            id: 5,
            img: "/img/howto/comparison_img3.jpg",
            tl: "投稿削除",
            txt: "投稿をマウスホバーしたときに出る、右上のメニューアイコンから削除できます。",
            imgalt: "管理画面ホーム投稿画面",
            inyo: ""
        },{
            id: 6,
            img: "/img/howto/comparison_img4.jpg",
            tl: "退会",
            txt: "管理画面の左メニュー欄のアカウントにあるアカウント削除から可能です。削除すると投稿した求人やアカウント情報は全て削除されます。",
            imgalt: "退会画面",
            inyo: ""
        },
    ]
    const [flowaction, setFlowAction] = useState<number>(1)
    const onFlowbt = (e) => {
        setFlowAction(Number(e.currentTarget.value))
    }
    const onArrpwup = () => {
        setFlowAction(flowaction + 1)
    }
    const onArrpwdown = () => {
        setFlowAction(flowaction - 1)
    }
    return (
        <Layout>
            <Head>
                <title>求人掲載方法 | Micro Guild</title>
            </Head>
            <main className={`${styles.howto_main} com_main`}>
                <section className={`${styles.howto_sec1} ${styles.howto_sec}`}>
                    <div className={`${styles.howto_sec_in}`}>
                        <h2 className={`${styles.howto_h2}`}>Micro Guildの求人掲載方法</h2>
                        <div className={`${styles.howto_sec1_slider_wrap}`}>
                            <div className={`${styles.howto_sec1_slider_boxs}`}>
                                {howtoflows.map((flow) => {
                                    return (
                                        <div className={`${styles.howto_sec1_slider_box} ${flowaction === flow.id ? `${styles.howto_sec1_slider_active}` : ""}`} key={flow.id}>
                                            <h3>{flow.title}</h3>
                                            <div className={`${styles.howto_sec1_slider_box_txt_box}`}>
                                                {flow.content}
                                            </div>
                                            <div className={`${styles.howto_sec1_slider_box_img}`}>
                                                <Image src={flow.img} layout='fill' objectFit='contain' alt={flow.imgalt} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`${styles.howto_sec1_slider_paginations}`}>
                                {howtoflowbts.map((bt) => {
                                    return (
                                        <div className={`${styles.howto_sec1_slider_pagination} ${flowaction === bt.id ? `${styles.howto_sec1_pagination_active}` : ""}`} key={bt.id}>
                                            <button value={bt.id} onClick={onFlowbt}>
                                                <div className={styles.howto_sec1_slider_pagination_icon}>
                                                    {bt.icon}
                                                </div>
                                                <div className={styles.howto_sec1_slider_pagination_tl}>
                                                    {bt.tl}
                                                </div>
                                            </button>
                                            <div className={`${styles.howto_sec1_slider_arrow} ${howtoflowbts.length === bt.id ? `${styles.howto_sec1_slider_arrow_last}` : ""}`}>
                                                <ArrowDownwardIcon />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.howto_sec1_slider_arrows} ${flowaction === 1 ? `${styles.howto_sec1_slider_arrows_down}` : ""}`}>
                        {flowaction != 1 ? <button onClick={onArrpwdown} className={`${styles.howto_sec1_slider_arrow_prev}`}><ArrowBackIosIcon /></button> : ""}
                        {flowaction != howtoflowbts.length ? <button onClick={onArrpwup} className={`${styles.howto_sec1_slider_arrow_next}`}><ArrowForwardIosIcon /></button> : ""}
                    </div>
                </section>
                <section className={`${styles.howto_sec2} ${styles.howto_sec}`}>
                    <div className={`${styles.howto_sec_in}`}>
                        <h2 className={`${styles.howto_h2}`}>その他機能一覧</h2>
                        <ul className={`${styles.howto_sec2_comparison_lists}`}>
                            {comparisons.map((compa) => {
                                return (
                                    <li className={`${styles.howto_sec2_comparison_list}`} key={compa.id}>
                                        <div className={`${styles.howto_sec2_comparison_list_img}`}>
                                            <Image src={`${compa.img}`} layout='fill' objectFit='contain' alt={`${compa.imgalt}`} />
                                            {compa.inyo ? <><span className={`${styles.howto_sec2_comparison_list_inyo}`}>引用 : <a href={`${compa.inyo}`} target="_blank" rel="noopener noreferrer">{compa.inyo}</a></span></> : ""}
                                        </div>
                                        <div className={`${styles.howto_sec2_comparison_list_tl}`}>{compa.tl}</div>
                                        <div className={`${styles.howto_sec2_comparison_list_txt} txt`}>{compa.txt}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Howto