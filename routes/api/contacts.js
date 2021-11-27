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
const { validation, ctrlWrapper } = require('../../middlewares')

router.get('/', ctrlWrapper(listContacts))

router.get('/:contactId', ctrlWrapper(getContactById))

router.post('/', validation(joiContactsSchema), ctrlWrapper(addContact))

router.delete('/:contactId', ctrlWrapper(removeContact))

router.put(
  '/:contactId',
  validation(joiContactsSchema),
  ctrlWrapper(updateContact),
)

router.patch(
  '/:contactId/favorite',
  validation(joiContactsFavoriteSchema),
  ctrlWrapper(updateFavorite),
)

module.exports = router
