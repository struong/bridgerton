import assert from 'node:assert/strict'
import test from 'node:test'
import { buildExternalAccountBody } from '../dist/core/external-accounts.js'

const defaults = { checkingOrSavings: 'checking' }

test('builds an individual IBAN external account', () => {
  assert.deepEqual(buildExternalAccountBody({
    ...defaults,
    accountType: 'iban',
    iban: 'NL91ABNA0417164300',
    bic: 'ABNANL2A',
    accountOwnerName: 'Ada Lovelace',
    accountOwnerType: 'individual',
    bankName: 'ABN AMRO',
    accountName: 'EUR Account',
    firstName: 'Ada',
    lastName: 'Lovelace',
    street: 'Gustav Mahlerlaan 10',
    city: 'Amsterdam',
    postalCode: '1082PP',
    country: 'NLD',
  }), {
    currency: 'eur',
    account_type: 'iban',
    account_owner_name: 'Ada Lovelace',
    account_owner_type: 'individual',
    bank_name: 'ABN AMRO',
    account_name: 'EUR Account',
    first_name: 'Ada',
    last_name: 'Lovelace',
    iban: { account_number: 'NL91ABNA0417164300', country: 'NLD', bic: 'ABNANL2A' },
    address: { street_line_1: 'Gustav Mahlerlaan 10', city: 'Amsterdam', postal_code: '1082PP', country: 'NLD' },
  })
})

test('requires owner fields for an IBAN external account', () => {
  assert.throws(
    () => buildExternalAccountBody({ ...defaults, accountType: 'iban', iban: 'NL91ABNA0417164300' }),
    /--bic, --accountOwnerName, --accountOwnerType/,
  )
})

test('preserves US external account behavior and defaults its address country', () => {
  assert.deepEqual(buildExternalAccountBody({
    ...defaults,
    accountNumber: '123456789012',
    routingNumber: '123456789',
    accountOwnerName: 'Ada Lovelace',
    street: '123 Main Street',
  }), {
    currency: 'usd',
    account_type: 'us',
    account_owner_name: 'Ada Lovelace',
    account: { account_number: '123456789012', routing_number: '123456789', checking_or_savings: 'checking' },
    address: { country: 'USA', street_line_1: '123 Main Street' },
  })
})
