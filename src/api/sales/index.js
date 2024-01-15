import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, featured, currentuser } from './controller'
import { schema } from './model'
export sales, { schema } from './model'

const router = new Router()
const { title, item_amount, phone_number, description, logo_url, is_featured } = schema.tree

/**
 * @api {post} /moneyplans Create sales
 * @apiName CreateMoneyplan
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title sales's title.
 * @apiParam item_amount sales's item_amount.
 * @apiParam phone_number sales's phone_number.
 * @apiParam description sales's description.
 * @apiParam logo_url sales's logo_url.
 * @apiParam is_featured sales's is_featured.
 * @apiSuccess {Object} sales sales's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 sales not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, item_amount, phone_number, description, logo_url, is_featured }),
  create)

/**
 * @api {get} /moneyplans Retrieve moneyplans
 * @apiName RetrieveMoneyplans
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of moneyplans.
 * @apiSuccess {Object[]} rows List of moneyplans.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /moneyplans/featured featured Retrieve moneyplans
 * @apiName RetrieveMoneyplans featured
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of moneyplans.
 * @apiSuccess {Object[]} rows List of moneyplans.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/featured',
token({ required: true }),
query(),
featured)

router.get('/currentuser',
token({ required: true }),
query(),
currentuser)
 
 

 

 

   

/**
 * @api {get} /moneyplans/:id Retrieve sales
 * @apiName RetrieveMoneyplan
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} sales sales's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 sales not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /moneyplans/:id Update sales
 * @apiName UpdateMoneyplan
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title sales's title.
 * @apiParam item_amount sales's item_amount.
 * @apiParam phone_number sales's phone_number.
 * @apiParam description sales's description.
 * @apiParam logo_url sales's logo_url.
 * @apiParam is_featured sales's is_featured.
 * @apiSuccess {Object} sales sales's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 sales not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, item_amount, phone_number, description, logo_url, is_featured }),
  update)

/**
 * @api {delete} /moneyplans/:id Delete sales
 * @apiName DeleteMoneyplan
 * @apiGroup sales
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 sales not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
