import React from 'react'

export const Pagination = ({ childrenRenderedPerPage, totalChildren, paginate }) => {
    const pageNumbers = []

    for ( let i = 1; i <= Math.ceil( totalChildren / childrenRenderedPerPage); i++ ){
        pageNumbers.push(i)
    }

  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map( number => (
                <li key={ number } className="page-item">
                    <button className='page-link' onClick={() => paginate( number )}>
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}
