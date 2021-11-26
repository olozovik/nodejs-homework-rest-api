const express = require('express')
const router = express.Router()
const {
  contactsCtrl: { listContacts },
} = require('../../controllers')
const {
  contacts: { joiContactsSchema },
} = require('../../models')
const { validation, ctrlWrapper } = require('../../middlewares')

router.get('/', ctrlWrapper(listContacts))
//
// router.get('/:contactId', ctrlWrapper(getContactById))
//
// router.post('/', validation(joiContactsSchema), ctrlWrapper(addContact))
//
// router.delete('/:contactId', ctrlWrapper(removeContact))
//
// router.put(
//   '/:contactId',
//   validation(joiContactsSchema),
//   ctrlWrapper(updateContact),
// )

module.exports = router
