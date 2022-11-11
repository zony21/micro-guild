import Link from 'next/link'
import React from 'react'
import styles from '../styles/Topics.module.scss'

const Sidebar_topics = (props) => {
    return (
        <>
            <div className={`${styles.topics_side_menu_cat}`}>
                <ul className={`${styles.topics_side_menu_cat_lists}`}>
                    {props.cats.map((cat, index) => {
                        return (
                            <li className={`${styles.topics_side_menu_cat_list}`} key={index}><Link href={`/topics/category/${cat.id}`}>{cat.name}</Link></li>
                        )
                    })}
                </ul>
            </div>
            <div className={`${styles.topics_side_menu_archive}`}>
                <ul className={`${styles.topics_side_menu_archive_lists}`}>
                    {Object.keys(props.monthlyIndex).map((index) => (
                        <li className={`${styles.topics_side_menu_archive_list}`} key={index}>
                            <Link href={`/topics/archive/${index}`}>
                                {index.split("_")[0] + "年" + index.split("_")[1] + "月"}
                            </Link>
                            （{props.monthlyIndex[index].length}）
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`bt ${styles.topics_side_menu_allposts}`}>
                <Link href={`/topics/page/1`}>
                    <a className={`bt_link ${styles.topics_side_menu_allposts_in}`}>全ての記事</a>
                </Link>
            </div>
        </>
    )
}

export default Sidebar_topics