import { useContext } from 'react'

import { Context } from 'layouts/DefaultLayout'
import { StorageInterface } from 'types/storage.interface'

const useStorage = (): StorageInterface => {
  const storage: StorageInterface = useContext(Context)
  return storage
}

export default useStorage
