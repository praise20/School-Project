import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { sales } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, sales

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  sales = await sales.create({ user_id: user })
})

test('POST /moneyplans 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', item_amount: 'test', phone_number: 'test', description: 'test', logo_url: 'test', is_featured: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.item_amount).toEqual('test')
  expect(body.phone_number).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.logo_url).toEqual('test')
  expect(body.is_featured).toEqual('test')
  expect(typeof body.user_id).toEqual('object')
})

test('POST /moneyplans 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /moneyplans 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user_id).toEqual('object')
})

test('GET /moneyplans 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /moneyplans/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${sales.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sales.id)
  expect(typeof body.user_id).toEqual('object')
})

test('GET /moneyplans/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${sales.id}`)
  expect(status).toBe(401)
})

test('GET /moneyplans/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /moneyplans/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${sales.id}`)
    .send({ access_token: userSession, title: 'test', item_amount: 'test', phone_number: 'test', description: 'test', logo_url: 'test', is_featured: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(sales.id)
  expect(body.title).toEqual('test')
  expect(body.item_amount).toEqual('test')
  expect(body.phone_number).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.logo_url).toEqual('test')
  expect(body.is_featured).toEqual('test')
  expect(typeof body.user_id).toEqual('object')
})

test('PUT /moneyplans/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${sales.id}`)
    .send({ access_token: anotherSession, title: 'test', item_amount: 'test', phone_number: 'test', description: 'test', logo_url: 'test', is_featured: 'test' })
  expect(status).toBe(401)
})

test('PUT /moneyplans/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${sales.id}`)
  expect(status).toBe(401)
})

test('PUT /moneyplans/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', item_amount: 'test', phone_number: 'test', description: 'test', logo_url: 'test', is_featured: 'test' })
  expect(status).toBe(404)
})

test('DELETE /moneyplans/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sales.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /moneyplans/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sales.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /moneyplans/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${sales.id}`)
  expect(status).toBe(401)
})

test('DELETE /moneyplans/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
