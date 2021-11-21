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
const { validation } = require('../../middlewares')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validation(contactsSchema), addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validation(contactsSchema), updateContact)

module.exports = router
