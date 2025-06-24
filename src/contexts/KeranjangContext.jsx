import React, { createContext, useContext, useState } from 'react'

const KeranjangContext = createContext()

export const KeranjangProvider = ({ children }) => {
  const [keranjang, setKeranjang] = useState([])

  const tambahKeKeranjang = (itemBaru) => {
    setKeranjang((prevKeranjang) => {
      const index = prevKeranjang.findIndex(item =>
        item.barangid === itemBaru.barangid &&
        item.ukuranid === itemBaru.ukuranid
      )

      // Jika ada, update jumlah
      if (index !== -1) {
        const updatedKeranjang = [...prevKeranjang]
        updatedKeranjang[index] = {
          ...updatedKeranjang[index],
          jumlah: updatedKeranjang[index].jumlah + itemBaru.jumlah
        }
        return updatedKeranjang
      }

      // Jika tidak ada, tambahkan ke keranjang
      return [...prevKeranjang, itemBaru]
    })
  }
  const kosongkanKeranjang = () => {
    setKeranjang([]) // Kosongkan array
  }
  const hapusDariKeranjang = (barangid, ukuranid) => {
    setKeranjang(prev =>
      prev.filter(item =>
        !(item.barangid === barangid && item.ukuranid === ukuranid)
      )
    )
  }

  return (
    <KeranjangContext.Provider value={{ keranjang, tambahKeKeranjang, kosongkanKeranjang, hapusDariKeranjang }}>
      {children}
    </KeranjangContext.Provider>
  )
}

export const useKeranjang = () => useContext(KeranjangContext)
