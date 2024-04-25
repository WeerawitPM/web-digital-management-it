import { configureStore } from '@reduxjs/toolkit'
import equipmentSlice from './equipmentSlice'

export const store = () => {
  return configureStore({
    reducer: {
      equipment: equipmentSlice
    },
  })
}