import { sales } from '.'
import { User } from '../user'

let user, sales

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  sales = await sales.create({ user_id: user, title: 'test', item_amount: 'test', phone_number: 'test', description: 'test', logo_url: 'test', is_featured: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = sales.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sales.id)
    expect(typeof view.user_id).toBe('object')
    expect(view.user_id.id).toBe(user.id)
    expect(view.title).toBe(sales.title)
    expect(view.item_amount).toBe(sales.item_amount)
    expect(view.phone_number).toBe(sales.phone_number)
    expect(view.description).toBe(sales.description)
    expect(view.logo_url).toBe(sales.logo_url)
    expect(view.is_featured).toBe(sales.is_featured)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = sales.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(sales.id)
    expect(typeof view.user_id).toBe('object')
    expect(view.user_id.id).toBe(user.id)
    expect(view.title).toBe(sales.title)
    expect(view.item_amount).toBe(sales.item_amount)
    expect(view.phone_number).toBe(sales.phone_number)
    expect(view.description).toBe(sales.description)
    expect(view.logo_url).toBe(sales.logo_url)
    expect(view.is_featured).toBe(sales.is_featured)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
