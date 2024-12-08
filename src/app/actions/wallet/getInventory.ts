'use server';
import { getInventory as fetchInventory } from '@/lib/handcash-client';
import { verifySession, getUser } from '@/lib/dal'

export async function getInventory() {
  try {
    const session = await verifySession()
    const user = await getUser(session.userId);
    if (!user.authToken) {
      return { error: 'User needs to verify email' };
    }
    const inventory = await fetchInventory(user.authToken);
    return { success: true, data: inventory };
  } catch (error: any) {
    return { error: error.message || 'Failed to fetch inventory' };
  }
} 