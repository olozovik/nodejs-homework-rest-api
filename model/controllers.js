const { getContacts, writeContacts } = require('./handleContacts')
const {
  contactAddValidation,
  contactUpdateValidation,
} = require('../validations/contacts')

const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts()
    res.status(200).json(contacts)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params
    const contacts = await getContacts()
    const contact = contacts.find(item => String(item.id) === contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(contact)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const contacts = await getContacts()
    const isContactExists = contacts.some(item => String(item.id) === contactId)

    if (!isContactExists) {
      return res.status(404).json({ message: 'Not found' })
    }

    const newContacts = contacts.filter(item => String(item.id) !== contactId)
    await writeContacts(newContacts)
    res.status(200).json({ message: 'contact deleted' })
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const addContact = async (req, res) => {
  try {
    const contacts = await getContacts()
    const body = req.body

    if (!body.name ?? !body.email ?? !body.phone) {
      return res.status(400).json({ message: 'missing required name field' })
    }

    const { error } = await contactAddValidation(body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const id = Date.now()
    const newContact = { id, ...body }
    contacts.push(newContact)
    await writeContacts(contacts)
    res.status(201).json(newContact)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const updateContact = async (req, res) => {
  try {
    const body = req.body

    if (!body.name && !body.email && !body.phone) {
      return res.status(400).json({ message: 'missing fields' })
    }

    const { error } = await contactUpdateValidation(body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { contactId } = req.params
    const contacts = await getContacts()
    const contactToChange = contacts.find(item => String(item.id) === contactId)

    if (!contactToChange) {
      return res.status(404).json({ message: 'Not found' })
    }

    const updatedContact = {
      id: contactToChange.id,
      name: body.name ?? contactToChange.name,
      email: body.email ?? contactToChange.email,
      phone: body.phone ?? contactToChange.phone,
    }

    const newContacts = contacts.map(item => {
      if (String(item.id) === contactId) {
        return updatedContact
      }
      return item
    })
    await writeContacts(newContacts)
    res.status(200).json(updatedContact)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
