import { success, notFound, authorOrAdmin } from '../../services/response/'
import { sales } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  sales.create({ ...body, user_id: user })
    .then((sales) => sales.view(true))
    .then(success(res, 201))
    .catch(next)

   export const featured = ({ querymen: { query, select, cursor } }, res, next) =>
   {
    sales.count(query)
    .then(count => sales.find({is_featured: true})
      .populate('user_id')
      .then((moneyplans) => ({
        count,
        rows: moneyplans.map((sales) => sales.view())
      }))
    )
    .then(success(res))
    .catch(next)   
  }

 //get money plans owned by current user
  export const currentuser  = ({ user }, res, next) =>
{
  
  sales.find({ "user_id": user._id})
    .then((moneyplans) => moneyplans.map((sales) => sales.view()))
    .then(success(res))
    .catch(next)   
  
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
{
  sales.count(query)
    .then(count => sales.find(query, select, cursor)
      .populate('user_id')
      .then((moneyplans) => ({
        count,
        rows: moneyplans.map((sales) => sales.view())
      }))
    )
    .then(success(res))
    .catch(next)  
  
}

export const show = ({ params }, res, next) =>
  sales.findById(params.id)
    .populate('user_id')
    .then(notFound(res))
    .then((sales) => sales ? sales.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  sales.findById(params.id)
    .populate('user_id')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user_id'))
    .then((sales) => sales ? Object.assign(sales, body).save() : null)
    .then((sales) => sales ? sales.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  sales.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user_id'))
    .then((sales) => sales ? sales.remove() : null)
    .then(success(res, 204))
    .catch(next)
