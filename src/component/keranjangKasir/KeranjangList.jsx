import React from 'react'
import KeranjangItem from './KeranjangItem'
import { useKeranjang } from '../../contexts/KeranjangContext'

const KeranjangList = () => {
  const { keranjang } = useKeranjang()
  

  return (
  <>
  <div className="space-y-4">
      {keranjang.length === 0 ? (
        <p className="text-zinc-600 italic">Keranjang kosong</p>
      ) : (
        keranjang.map((item, index) => (
          <KeranjangItem key={index} item={item} />
        ))
      )}
    </div>
  </>
  )
}

export default KeranjangList
