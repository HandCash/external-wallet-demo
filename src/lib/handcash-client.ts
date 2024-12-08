import { WalletService, Environments, Types } from '@handcash/handcash-sdk'
import logger from './logger'

export const walletService = new WalletService({
    appId: process.env.HANDCASH_APP_ID as string,
    appSecret: process.env.HANDCASH_APP_SECRET as string,
    env: Environments.iae,
})

export const getAccountFromAuthToken = (authToken: string) => {
    return walletService.getWalletAccountFromAuthToken(authToken)
}

export const getDepositInfo = (authToken: string) => {
    try {
        return getAccountFromAuthToken(authToken).wallet.getDepositInfo()
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to get deposit info', {
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function pay(authToken: string, destination: string, amount: number) {
    try {
        const account = getAccountFromAuthToken(authToken)
        const paymentResult = await account.wallet.pay({
            currencyCode: 'BSV',
            denominatedIn: 'USD',
            receivers: [{
                destination,
                amount,
            }]
        })
        return paymentResult
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to process payment', {
            destination,
            amount,
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function getTransactionHistory(authToken: string) {
    try {
        const account = getAccountFromAuthToken(authToken)
        const { items } = await account.wallet.getPaymentHistory({ from: 0, to: 100 })
        return items
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to get transaction history', {
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function requestSignUpEmailCode(email: string, html: string) {
    try {
        return await walletService.requestSignUpEmailCode(email, { html })
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to request sign-up email code', {
            email,
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function verifyEmailCode(requestId: string, code: string, accessPublicKey: string) {
    try {
        return await walletService.verifyEmailCode(requestId, code, accessPublicKey)
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to verify email code', {
            requestId,
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function getBalances(authToken: string) {
    try {
        const account = getAccountFromAuthToken(authToken)
        return account.wallet.getTotalBalance()
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to get balances', {
            error: err.message || 'Unknown error'
        })
        throw error
    }
}

export async function createPaymentRequest(destination: string, amount: number, redirectUrl: string | undefined) {
    try {
        const result = await fetch('https://iae.cloud.handcash.io/v3/paymentRequests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'App-Id': process.env.HANDCASH_APP_ID as string,
                'App-Secret': process.env.HANDCASH_APP_SECRET as string,
            },
            body: JSON.stringify({
                receivers: [{
                    destination,
                    amount,
                }],
                product: {
                    name: 'Deposit into Casino',
                },
                currencyCode: 'BSV',
                denominatedIn: 'USD',
                expirationType: 'never',
                redirectUrl,
            }),
        })
        const res = (await result.json())
        return res.paymentRequestUrl as string
    } catch (error: unknown) {
        const err = error as Error
        logger.error('Failed to create payment request', {
            destination,
            amount,
            error: err.message || 'Unknown error'
        })
        throw error
    }
}


export async function issueItem(authToken: string, collectionId: string, metadata: Types.CreateItemMetadata) {
    try {
        const account = walletService.getAdminAccountFromAuthToken(authToken)
        return account.admin.createItemsOrder({
            collectionId,
            items: [metadata]
        })
    } catch (error: unknown) {
        logger.error('Failed to issue game item', { metadata, error })
        throw error
    }
}


export async function getInventory(authToken: string) {
    try {
        const account = walletService.getWalletAccountFromAuthToken(authToken)
        return account.items.getItemInventory({});
    } catch (error: unknown) {
        logger.error('Failed to fetch items', { error })
        throw error
    }
}



