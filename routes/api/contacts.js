const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require('../../controllers')

const { joiContactsSchema, joiContactsFavoriteSchema } = require('../../models')
const { validation, ctrlWrapper, authorization } = require('../../middlewares')

router.get('/', authorization, ctrlWrapper(listContacts))

router.get('/:contactId', authorization, ctrlWrapper(getContactById))

router.post(
  '/',
  validation(joiContactsSchema),
  authorization,
  ctrlWrapper(addContact),
)

router.delete('/:contactId', authorization, ctrlWrapper(removeContact))

router.put(
  '/:contactId',
  authorization,
  validation(joiContactsSchema),
  ctrlWrapper(updateContact),
)

router.patch(
  '/:contactId/favorite',
  authorization,
  validation(joiContactsFavoriteSchema),
  ctrlWrapper(updateFavorite),
)

module.exports = router
