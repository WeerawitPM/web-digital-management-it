"use client"
import React  from 'react'
import initializeStore from './store';
import { Provider } from 'react-redux'

export default function ReduxProvider({ children }) {
  const store = initializeStore();
  return (
    <Provider store={store}>{children}</Provider>
  )
}