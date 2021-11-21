const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
} = require('../../controllers/contacts')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', addContact)
//
// router.delete('/:contactId', removeContact)
//
// router.put('/:contactId', updateContact)

module.exports = router
