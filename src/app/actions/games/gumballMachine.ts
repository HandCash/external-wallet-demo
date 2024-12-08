"use server"

import { getDepositInfo, issueItem, pay } from '@/lib/handcash-client'
import gunsData from '@/data/guns.json'
import { verifySession, getUser } from '@/lib/dal'
import logger from '@/lib/logger'

export type GunItem = typeof gunsData.items[0]
const businessWalletId = process.env.BUSINESS_WALLET_ID as string
const businessWalletAuthToken = process.env.BUSINESS_WALLET_AUTH_TOKEN as string
const collectionId = "66e04f88940db19f6ea10b72";

export async function playGumballMachine(): Promise<{ error?: string; data?: GunItem }> {
  try {
    // 1. Verify session and get user
    const session = await verifySession()
    const user = await getUser(session.userId)

    if (!user.authToken) {
      return { error: 'User needs to verify email' }
    }

    // 2. Get user's deposit info to get their ID
    const depositInfo = await getDepositInfo(user.authToken)
    
    // 3. Process payment (25 cents)
    // await pay(
    //   user.authToken,
    //   businessWalletId,
    //   0.25
    // )
    
    // 4. Select random item
    const selectedItem = gunsData.items[Math.floor(Math.random() * gunsData.items.length)]
    
    // 5. Issue item to user with full metadata
    const order = await issueItem(businessWalletAuthToken, collectionId, {
      name: selectedItem.name,
      user: depositInfo.id,
      description: selectedItem.description,
      attributes: selectedItem.attributes.map(attr => ({
        ...attr,
        displayType: attr.displayType as 'string' | 'number' | 'date'
      })),
      mediaDetails: selectedItem.mediaDetails,
    })
    logger.info("Order created", { order })
    
    return { data: selectedItem }
    
  } catch (error: any) {
    console.error("Error in gumball machine:", error)
    return { error: error.message || 'Failed to play gumball machine' }
  }
}