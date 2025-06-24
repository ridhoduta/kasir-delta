import React from 'react'
import BarangItem from './BarangItem'

const BarangList = ({data, onTambah}) => {
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((item) => (
        <BarangItem key={item.barangid} data={item} onTambah={onTambah} />
      ))}
    </div>
    </>
    
  )
}

export default BarangList
