import { bridge } from './client.js'

/** Create a virtual account for a customer. */
export const createVirtualAccount = (customerId: string, data: Record<string, unknown>) =>
  bridge.post(`/customers/${customerId}/virtual_accounts`, data)

/** Get a virtual account by ID. */
export const getVirtualAccount = (customerId: string, id: string) =>
  bridge.get(`/customers/${customerId}/virtual_accounts/${id}`)

/** List virtual accounts for a customer. */
export const listVirtualAccounts = (customerId: string) =>
  bridge.get(`/customers/${customerId}/virtual_accounts`)

/** List all virtual accounts across all customers. */
export const listAllVirtualAccounts = () =>
  bridge.get('/virtual_accounts')

/** Update a virtual account. */
export const updateVirtualAccount = (customerId: string, id: string, data: Record<string, unknown>) =>
  bridge.put(`/customers/${customerId}/virtual_accounts/${id}`, data)

/** Deactivate a virtual account. */
export const deactivateVirtualAccount = (customerId: string, id: string) =>
  bridge.post(`/customers/${customerId}/virtual_accounts/${id}/deactivate`, {})

/** Reactivate a virtual account. */
export const reactivateVirtualAccount = (customerId: string, id: string) =>
  bridge.post(`/customers/${customerId}/virtual_accounts/${id}/reactivate`, {})

/** Get activity history for a virtual account. */
export const getVirtualAccountActivity = (customerId: string, id: string) =>
  bridge.get(`/customers/${customerId}/virtual_accounts/${id}/history`)

/** Get activity history for all virtual accounts. */
export const getAllVirtualAccountActivity = () =>
  bridge.get('/virtual_accounts/history')
