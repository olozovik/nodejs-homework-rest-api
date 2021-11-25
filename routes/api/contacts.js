const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts')
const { contactsSchema } = require('../../schemas')
const { validation, ctrlWrapper } = require('../../middlewares')

router.get('/', ctrlWrapper(listContacts))

router.get('/:contactId', ctrlWrapper(getContactById))

router.post('/', validation(contactsSchema), ctrlWrapper(addContact))

router.delete('/:contactId', ctrlWrapper(removeContact))

router.put(
  '/:contactId',
  validation(contactsSchema),
  ctrlWrapper(updateContact),
)

module.exports = router
