"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCoins } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { playGumballMachine } from '@/app/actions/games/gumballMachine'
import { toast } from 'react-hot-toast'
import type { GunItem } from '@/app/actions/games/gumballMachine'
import gunsData from '@/data/guns.json'

export default function ItemGumballMachine() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentItem, setCurrentItem] = useState<GunItem | null>(null)
  const [winner, setWinner] = useState<GunItem | null>(null)

  const spinGumballMachine = async () => {
    try {
      setIsSpinning(true)
      setWinner(null)
      
      // Start animation
      const interval = setInterval(() => {
        const randomItem = gunsData.items[Math.floor(Math.random() * gunsData.items.length)]
        setCurrentItem(randomItem)
      }, 100)

      // Make server call
      const response = await playGumballMachine()
      
      if (response.error) {
        toast.error(response.error)
        setIsSpinning(false)
        clearInterval(interval)
        return
      }

      if (!response.data) {
        toast.error('No item received')
        setIsSpinning(false)
        clearInterval(interval)
        return
      }
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear animation and show result
      clearInterval(interval)
      setWinner(response.data)
      setIsSpinning(false)
      
      toast.success(`Congratulations! You won: ${response.data.name}`)
    } catch (error) {
      toast.error('Failed to play. Please try again.')
      setIsSpinning(false)
    }
  }

  const displayItem = isSpinning ? currentItem : winner

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Item Gumball Machine</h1>
        
        <div className="relative w-64 h-64 bg-red-500 rounded-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-red-600 rounded-full m-2"></div>
          <div className="z-10 w-52 h-52 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayItem?.name || 'empty'}
                className="flex flex-col items-center justify-center p-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {displayItem ? (
                  <motion.img
                    src={displayItem.mediaDetails.image.url}
                    alt={displayItem.name}
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-xl font-bold text-center">Play to Win!</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <Button
          onClick={spinGumballMachine}
          disabled={isSpinning}
          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-200"
        >
          <FaCoins className="text-xl" />
          <span>Play for 25¢</span>
        </Button>
        
        {winner && !isSpinning && (
          <div className="text-center space-y-2">
            <p className="text-xl font-semibold text-gray-800">Congratulations!</p>
            <p className="text-lg text-gray-600">You won: {winner.name}</p>
            <div className="flex flex-col items-center space-y-1">
              <p className="text-sm text-gray-500">{winner.description}</p>
              <div className="flex space-x-2">
                {winner.attributes.map(attr => (
                  <span 
                    key={attr.name}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {attr.name}: {attr.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 