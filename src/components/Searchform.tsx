import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from '../styles/Searchform.module.scss'

const Searchform = (props) => {
    return (
        <>
            <form action="/jobs/search" className={`${styles.search_from}`} method="get">
                <input type="hidden" name={`jparea`}/>
                <input type="hidden" name={`employment`}/>
                <input type="hidden" name={`unit`}/>
                <input type="hidden" name={`mun`}/>
                <div className={`${styles.search_from_in} com_from`}>
                    <input type="text" className={`${styles.search_txt_input}`} placeholder={`検索ワード`} name={`s`} />
                    <button type='submit' className={`${styles.search_submit}`}>
                        <SearchIcon />
                    </button>
                </div>
            </form>
        </>
    )
}

export default Searchform