import { bridge } from './client.js'

export type ExternalAccountOptions = {
  accountType?: 'us' | 'iban' | undefined
  accountNumber?: string | undefined
  routingNumber?: string | undefined
  iban?: string | undefined
  bic?: string | undefined
  accountOwnerName?: string | undefined
  accountOwnerType?: 'individual' | 'business' | undefined
  checkingOrSavings: 'checking' | 'savings'
  bankName?: string | undefined
  accountName?: string | undefined
  firstName?: string | undefined
  lastName?: string | undefined
  businessName?: string | undefined
  street?: string | undefined
  city?: string | undefined
  state?: string | undefined
  postalCode?: string | undefined
  country?: string | undefined
}

function requireOptions(options: ExternalAccountOptions, names: (keyof ExternalAccountOptions)[], accountType: string) {
  const missing = names.filter((name) => !options[name])
  if (missing.length) {
    throw new Error(`${missing.map((name) => `--${name}`).join(', ')} required for ${accountType} external accounts`)
  }
}

/** Build a Bridge external-account request body from CLI options. */
export function buildExternalAccountBody(options: ExternalAccountOptions) {
  const accountType = options.accountType ?? (options.iban ? 'iban' : 'us')

  if (accountType === 'iban') {
    requireOptions(options, ['iban', 'bic', 'accountOwnerName', 'accountOwnerType', 'bankName', 'street', 'city', 'postalCode', 'country'], 'IBAN')
    if (options.accountOwnerType === 'individual') {
      requireOptions(options, ['firstName', 'lastName'], 'individual IBAN')
    } else {
      requireOptions(options, ['businessName'], 'business IBAN')
    }

    return {
      currency: 'eur',
      account_type: 'iban',
      account_owner_name: options.accountOwnerName,
      account_owner_type: options.accountOwnerType,
      bank_name: options.bankName,
      ...(options.accountName ? { account_name: options.accountName } : {}),
      ...(options.firstName ? { first_name: options.firstName } : {}),
      ...(options.lastName ? { last_name: options.lastName } : {}),
      ...(options.businessName ? { business_name: options.businessName } : {}),
      iban: {
        account_number: options.iban,
        country: options.country,
        bic: options.bic,
      },
      address: {
        street_line_1: options.street,
        city: options.city,
        ...(options.state ? { state: options.state } : {}),
        postal_code: options.postalCode,
        country: options.country,
      },
    }
  }

  requireOptions(options, ['accountNumber', 'routingNumber', 'accountOwnerName'], 'US')
  const body: Record<string, unknown> = {
    currency: 'usd',
    account_type: 'us',
    account_owner_name: options.accountOwnerName,
    account: {
      account_number: options.accountNumber,
      routing_number: options.routingNumber,
      checking_or_savings: options.checkingOrSavings,
    },
  }
  if (options.bankName) body.bank_name = options.bankName
  if (options.accountName) body.account_name = options.accountName
  if (options.firstName) body.first_name = options.firstName
  if (options.lastName) body.last_name = options.lastName
  if (options.businessName) body.business_name = options.businessName
  if (options.street || options.city || options.state || options.postalCode) {
    body.address = {
      country: options.country ?? 'USA',
      ...(options.street ? { street_line_1: options.street } : {}),
      ...(options.city ? { city: options.city } : {}),
      ...(options.state ? { state: options.state } : {}),
      ...(options.postalCode ? { postal_code: options.postalCode } : {}),
    }
  }
  return body
}

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
