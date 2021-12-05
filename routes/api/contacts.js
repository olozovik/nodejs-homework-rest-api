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

const { joiContactsSchema } = require('../../models')
const {
  validation,
  ctrlWrapper,
  authorization,
  validContactId,
} = require('../../middlewares')

router.get('/', authorization, ctrlWrapper(listContacts))

router.get(
  '/:contactId',
  authorization,
  validContactId,
  ctrlWrapper(getContactById),
)

router.post(
  '/',
  authorization,
  validation(joiContactsSchema),
  ctrlWrapper(addContact),
)

router.delete(
  '/:contactId',
  authorization,
  validContactId,
  ctrlWrapper(removeContact),
)

router.put(
  '/:contactId',
  authorization,
  validContactId,
  validation(joiContactsSchema),
  ctrlWrapper(updateContact),
)

router.patch(
  '/:contactId/favorite',
  authorization,
  validContactId,
  ctrlWrapper(updateFavorite),
)

module.exports = router
