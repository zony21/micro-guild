import Head from 'next/head'
import React from 'react'
import styles from '../styles/Privacy.module.scss'
import Layout from '../components/Layout'

const Privacy = () => {
  return (
    <Layout>
      <Head>
        <title>プライバシーポリシー | Micro Guild</title>
      </Head>
      <main className={`${styles.privacy_main} com_main`}>
        <h1 className={`com_h2 under_h1 ${styles.privacy_h1}`}>
          プライバシーポリシー
        </h1>
        <section className={`${styles.privacy_sec1} ${styles.privacy_sec}`} id='sec1'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>1.はじめに</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            Micro Guild（以下「当方」といいます。）を提供するにあたり、ご利用される皆様（以下「利用者」といいます。）の個人に関する情報（以下「個人情報」といいます。）を取得します。
          </div>
        </section>
        <section className={`${styles.privacy_sec2} ${styles.privacy_sec}`} id='sec2'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>適用範囲</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            本プライバシーポリシー（以下「本ポリシー」といいます。）は、当方が利用者から個人情報を取得、利用及び管理するときに適用されます。
          </div>
        </section>
        <section className={`${styles.privacy_sec3} ${styles.privacy_sec}`} id='sec3'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>取得する情報</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方は、利用者から以下の情報を取得します。
          </div>
          <ul>
            <li>
              氏名
            </li>
            <li>
              メールアドレス
            </li>
          </ul>
        </section>
        <section className={`${styles.privacy_sec4} ${styles.privacy_sec}`} id='sec4'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>利用目的</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方が個人情報を収集・利用する目的は、以下のとおりです。
          </div>
          <ul className={`${styles.privacy_ul_2n}`}>
            <li>本サービスの運営上必要な事項の通知のため</li>
            <li>本サービスの会員であるお客様の管理のため</li>
            <li>本サービスの各種問合せ、アフターサービス対応のため</li>
            <li>上記の利用目的に付随する目的</li>
          </ul>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方のアプリにおいては、Google Analytics for Firebase及びFirebase Crashlyticsを利用いたします。なお、取得した情報につき、当方及びGoogle Inc.（以下「Google」という。）において利用いたします。<br /><br />
            Googleでは、Googleの利用規約及びプライバシーポリシー等に従い、データの収集及び処理を行います。データ収集及び処理の仕組みについての詳細は、「ユーザーが Google パートナーのサイトやアプリを使用する際の Google によるデータ使用」をご覧ください。
          </div>
        </section>
        <section className={`${styles.privacy_sec5} ${styles.privacy_sec}`} id='sec5'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>Cookieの利用</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方は、ウェブサイト及び本サービス（以下、これらを総称して「ウェブサイト等」といいます。）のアクセス及び利用状況の分析、広告配信並びにウェブサイト等の利便性向上のために、ウェブサイト等にアクセスした利用者の情報通信端末に保存されるCookie等のファイル及びこれに類似する技術を取得することがあります。当方は、Cookie等と利用者の個人情報を関連付けることがあります。当方は、利用者の個人情報と関連付けたCookie等が利用者の個人情報であることに鑑み、当該Cookie等を本個人情報保護方針の定めに従って管理いたします。また、当方は、Cookie等の情報を第三者が運営するデータ・マネジメント・プラットフォームに提供し、当該第三者からCookie等により収集されたウェブの閲覧履歴及びその分析結果を取得し、これらを利用者の個人データと結び付けた上で、広告配信等の目的で利用することがあります。
          </div>
        </section>
        <section className={`${styles.privacy_sec6} ${styles.privacy_sec}`} id='sec6'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>安全確保の措置</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方は、収集した情報の漏えい、滅失又はき損の防止その他収集した情報の適切な管理のために必要な措置を講じます。当方が、安全管理のために講じた措置の概要は以下のとおりです。措置の具体的内容については、本ポリシーで定める窓口に対する利用者からの求めに応じて遅滞なく回答いたします。
          </div>
          <ul>
            <li>基本方針の策定、個人情報の取扱いに係る規律の整備</li>
            <li>個人情報を取り扱うことのできる機器やアクセス権者を明確にし、個人情報への不要なアクセスを防止</li>
            <li>個人情報を取り扱う機器等のOSを最新の状態に保持</li>
          </ul>
        </section>
        <section className={`${styles.privacy_sec7} ${styles.privacy_sec}`} id='sec7'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>個人情報の第三者への提供</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            1,当方は、次に掲げる場合を除いて、あらかじめ利用者の同意を得ないで、取得した個人情報を第三者に提供することはありません。
          </div>
          <ul className={`${styles.privacy_ul_2n}`}>
            <li>法令に基づく場合</li>
            <li>人の生命、身体又は財産の保護のために必要がある場合であって、利用者の同意を得ることが困難であるとき</li>
            <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、利用者の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
          </ul>
          <div className={`${styles.privacy_contents_txt} txt`}>
            2,前項の定めにかかわらず、次に掲げる場合には、当該個人情報の提供先は第三者に該当しないものとします。
          </div>
          <ul>
            <li>当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託することに伴って当該個人情報が提供される場合</li>
            <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
          </ul>
        </section>
        <section className={`${styles.privacy_sec8} ${styles.privacy_sec}`} id='sec8'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>個人情報の共同利用</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方は、特定の者との間で共同利用することを目的として個人情報を当該特定の者に提供することがあります。この場合、当方は、あらかじめ、共同して利用する個人情報の項目、共同して利用する者の範囲、利用する者の利用目的及び当該個人情報の管理について責任を有する者の氏名又は名称を公表するものとします。
          </div>
        </section>
        <section className={`${styles.privacy_sec9} ${styles.privacy_sec}`} id='sec9'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>本プライバシーポリシーの変更</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方は、法令改正への対応の必要性及び事業上の必要性に応じて、本ポリシーを変更する場合があります。本ポリシーの変更を行った場合には、本ウェブサイト上に掲載します。
          </div>
        </section>
        <section className={`${styles.privacy_sec10} ${styles.privacy_sec}`} id='sec10'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>開示、訂正等の手続</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            利用者は、本条に従って、当方に対し以下の求め又は請求を行うことができます。
          </div>
          <ul className={`${styles.privacy_ul_2n}`}>
            <li>利用者から個人情報の利用目的の通知の求め</li>
            <li>利用者の個人情報の開示の請求</li>
            <li>当方が保有する利用者の個人情報の内容が事実でない場合における、当該内容の訂正、追加又は削除の請求</li>
            <li>利用者の個人情報が利用者に対して通知若しくは公表した利用目的の達成に必要な範囲を超えて取り扱われた場合又は当該個人情報が偽りその他不正の手段によって取得された場合における、当該個人情報の利用の停止又は消去の請求</li>
            <li>利用者の個人情報が個人情報保護法第23条第1項又は第24条の規定に違反して第三者に提供されている場合における、当該個人情報の第三者への提供の停止の請求</li>
          </ul>
          <div className={`${styles.privacy_contents_txt} txt`}>
            前項の求め又は請求にあたっては、同項各号のうちいずれの請求か特定の上、本人確認のための書類（運転免許証、健康保険証、住民票の写し等）をご提出頂きます。
          </div>
        </section>
        <section className={`${styles.privacy_sec11} ${styles.privacy_sec}`} id='sec11'>
          <h2 className={`com_h3 ${styles.privacy_h2}`}>お問い合わせ</h2>
          <div className={`${styles.privacy_contents_txt} txt`}>
            当方の個人情報の取扱いに関するご相談や苦情等のお問い合わせについては、下記の窓口にご連絡ください。<br /><br />
            個人情報取扱事業者の氏名又は名称、住所及び代表者の氏名については、ウェブサイトの会社概要をご参照頂く他、利用者の求めに応じて遅滞なく回答します。<br /><br />
            Eメールアドレス:<br />micro.guild.system@gmail.com
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Privacy