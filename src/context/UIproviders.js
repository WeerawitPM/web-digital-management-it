'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ChakraProvider } from '@chakra-ui/react'

export function UIProviders({ children }) {
  return (
    <NextUIProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </NextUIProvider>
  )
}