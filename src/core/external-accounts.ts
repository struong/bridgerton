import { bridge } from './client.js'

/** Create an external account for a customer. */
export const createExternalAccount = (customerId: string, data: Record<string, unknown>) =>
  bridge.post(`/customers/${customerId}/external_accounts`, data)

/** Get an external account by ID. */
export const getExternalAccount = (customerId: string, externalAccountId: string) =>
  bridge.get(`/customers/${customerId}/external_accounts/${externalAccountId}`)

/** List external accounts for a customer. */
export const listExternalAccounts = (customerId: string) =>
  bridge.get(`/customers/${customerId}/external_accounts`)

/** Delete (deactivate) an external account. */
export const deleteExternalAccount = (customerId: string, externalAccountId: string) =>
  bridge.delete(`/customers/${customerId}/external_accounts/${externalAccountId}`)
