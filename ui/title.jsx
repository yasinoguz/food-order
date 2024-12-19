import React from 'react'

function title({children,addclas}) {
  return (
    <div className={`${addclas} font-dancing`}>{children}</div>
  )
}

export default title