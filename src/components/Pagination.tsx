import Link from 'next/link'

const Pagination = (props) => {
    const PER_PAGE = 6
    const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)
    return (
        <ul className={`pagenation_lists`}>
            {range(1, Math.ceil(props.totalCount / PER_PAGE)).map((number, index) => (
                <li key={index} className={`pagenation_list ${props.nowpage == number ? 'active' : ''}`}>
                    {props.nowpage != number ? (
                        <Link href={`/topics/page/${number}`}>
                            <a>{number}</a>
                        </Link>
                    ) : (
                        <span>{number}</span>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default Pagination