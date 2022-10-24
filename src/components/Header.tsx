import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'
import SortIcon from '@mui/icons-material/Sort'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import searchstyles from '../styles/Searchform.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FmdGoodIcon from '@mui/icons-material/FmdGood'

const jparea = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]

const Header = () => {
  const [iconset, setIconSet] = useState(true)
  const [menuopen, setMenuOpen] = useState(false)
  const [areaopen, setAreaopen] = useState(false)
  const [areatxton, setAreatxton] = useState(true)
  const [areatxt, setAreatxt] = useState([])
  const [muntxt, setMuntxt] = useState("")
  const [keyword, setKeyword] = useState("")
  const [val, setVal] = React.useState([''])
  const checkChange = e => {
    if (val.includes(e.target.value)) {
      setVal(val.filter(item => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  }
  const onClickMenuOpen = () => {
    setMenuOpen(true)
    setIconSet(false)
  }
  const onClickMenuClose = () => {
    setMenuOpen(false)
    setIconSet(true)
  }
  const onKeywordtxt = (e) => {
    setKeyword(e.target.value)
  }
  const onMuntxt = (e) => {
    setMuntxt(e.target.value)
  }
  const [personName, setPersonName] = React.useState<any[]>([])
  const handleChange = (e) => {
    if (areatxt.includes(e.target.value)) {
      setAreatxt(
        areatxt.filter((checkedValue) => checkedValue !== e.target.value)
      )
    } else {
      setAreatxt([...areatxt, e.target.value]);
    }
  }
  const onAreaopen = () => {
    setAreaopen(true)
  }
  const onAreaclose = () => {
    setAreaopen(false)
  }
  useEffect(() => {
    if (areatxt.length === 0) {
      setAreatxton(false)
    } else {
      setAreatxton(true)
    }
  }, [areatxt])
  const onReset = (e) => {
    e.preventDefault()
    setKeyword("")
    setMuntxt("")
    setVal([''])
    setAreatxt([])
  }
  return (
    <>
      <header className="com_hed">
        <h1 className="logo">
          <Link href="/">
            <a>Micro Guild</a>
          </Link>
        </h1>
      </header>
      <div className={`${styles.h_menu}`}>
        <div className={`${styles.h_member}`}>
          <Link href="/mypage/home">
            <a>
              <AccountCircleIcon />
              <span>求人募集</span>
            </a>
          </Link>
        </div>
        {iconset ?
          <>
            <button onClick={onClickMenuOpen}>
              <div className={`${styles.h_menu_button}`}>
                <SortIcon />
                <span>検索</span>
              </div>
            </button>
          </>
          :
          <>
            <button onClick={onClickMenuClose}>
              <div className={`${styles.h_menu_button} ${styles.h_menu_button_active}`}>
                <CloseIcon />
                <span>閉じる</span>
              </div>
            </button>
          </>
        }
      </div>
      <div className={`${styles.header_menu} ${menuopen ? styles.header_menu_active : ""}`}>
        <div className={`${styles.header_menu_in}`}>
          <form action="/jobs/search" className={`${styles.h_search_from}`} method="get">
            <input type="hidden" name='area' value='' />
            <div className={`${styles.h_menu_search}`}>
              <div className={`${searchstyles.search_from_in} ${styles.h_menu_search_in}`}>
                <input type="text" className={`${searchstyles.search_txt_input}`} placeholder={`検索ワード`} name={`s`} value={keyword} onChange={onKeywordtxt}/>
                <div className={`${searchstyles.search_submit} ${styles.h_menu_search_submit}`}>
                  <SearchIcon />
                </div>
              </div>
            </div>
            <ul className={`${styles.h_menu_links}`}>
              <li className={`${styles.h_menu_links_tl}`}>地域</li>
              <li className={`${styles.h_menu_link}`}>
                <div className={`${styles.h_menu_area_box}`}>
                  <div className={`${styles.area_txt}`} onClick={onAreaopen}>{areatxton ? areatxt.join("、") : "複数選択可"}<span className={`${styles.h_menu_area_arrow}`}><KeyboardArrowDownIcon /></span></div>
                  <ul className={`${styles.h_menu_areas} ${areaopen ? `${styles.h_menu_areason}` : ""}`}>
                    {jparea.map((area, index) => (
                      <li className={`${styles.h_menu_area}`} key={index}>
                        <input type="checkbox" name="jparea" value={area} id={`jparea${index}`} onChange={handleChange} checked={areatxt.includes(area)}/>
                        <label htmlFor={`jparea${index}`}>
                          {area}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {areaopen ? <>
                    <div className={`${styles.h_menu_areas_close}`} onClick={onAreaclose}></div>
                  </> : ""}
                </div>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <div className={`${styles.h_menu_search}`}>
                  <div className={`${searchstyles.search_from_in} ${styles.h_menu_search_in}`}>
                    <input type="text" className={`${searchstyles.search_txt_input}`} placeholder={`市区町村`} name={`mun`} value={muntxt} onChange={onMuntxt} />
                    <div className={`${searchstyles.search_submit} ${styles.h_menu_search_submit}`}>
                      <FmdGoodIcon />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul className={`${styles.h_menu_links}`}>
              <li className={`${styles.h_menu_links_tl}`}>雇用形態</li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('正社員')} name="employment" value="正社員" /><span className={`${styles.h_menu_link_txt}`}>正社員</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('パート・アルバイト')} name="employment" value="パート・アルバイト" /><span className={`${styles.h_menu_link_txt}`}>パート・アルバイト</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('契約社員')} name="employment" value="契約社員" /><span className={`${styles.h_menu_link_txt}`}>契約社員</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('派遣社員')} name="employment" value="派遣社員" /><span className={`${styles.h_menu_link_txt}`}>派遣社員</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('インターンシップ')} name="employment" value="インターンシップ" /><span className={`${styles.h_menu_link_txt}`}>インターンシップ</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('ボランティア')} name="employment" value="ボランティア" /><span className={`${styles.h_menu_link_txt}`}>ボランティア</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('日雇い')} name="employment" value="日雇い" /><span className={`${styles.h_menu_link_txt}`}>日雇い</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('その他')} name="employment" value="その他" /><span className={`${styles.h_menu_link_txt}`}>その他</span>
                </label>
              </li>
            </ul>
            <ul className={`${styles.h_menu_links}`}>
              <li className={`${styles.h_menu_links_tl}`}>給与額の区分</li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('時給')} name="unit" value="時給" /><span className={`${styles.h_menu_link_txt}`}>時給</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('日給')} name="unit" value="日給" /><span className={`${styles.h_menu_link_txt}`}>日給</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('週休')} name="unit" value="週休" /><span className={`${styles.h_menu_link_txt}`}>週休</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('月給')} name="unit" value="月給" /><span className={`${styles.h_menu_link_txt}`}>月給</span>
                </label>
              </li>
              <li className={`${styles.h_menu_link}`}>
                <label>
                  <input type="checkbox" onChange={checkChange} checked={val.includes('年収')} name="unit" value="年収" /><span className={`${styles.h_menu_link_txt}`}>年収</span>
                </label>
              </li>
            </ul>
            <div className={`${styles.h_menu_submit_wrap}`}>
              <button className={`${styles.h_menu_submit} bt`} type="submit">
                <span className={`bt_link`}>検索する</span>
              </button>
              <button className={`${styles.h_menu_reset}`} onClick={onReset}>
                リセット
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${styles.menu_bg_close} ${menuopen ? styles.menu_bg_close_active : ""}`} onClick={onClickMenuClose}>
      </div>
    </>
  )
}

export default Header