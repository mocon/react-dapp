import { myloshisToMYLS } from '../utils/format'

it('Correctly formats large amounts of myloshis', () => {
  expect(myloshisToMYLS(1234567890)).toEqual('123456.7890')
  expect(myloshisToMYLS(123456789000)).toEqual('12345678.9000')
  expect(myloshisToMYLS(123456789012345)).toEqual('12345678901.2345')
})

it('Correctly formats small amounts of myloshis', () => {
  expect(myloshisToMYLS(42)).toEqual('0.0042')
  expect(myloshisToMYLS(200)).toEqual('0.0200')
  expect(myloshisToMYLS(123450)).toEqual('12.3450')
})