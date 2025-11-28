const contactsService = require("../services/contactsService");

exports.getContacts = async (req, res) => {
  const contacts = await contactsService.getContacts();
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  const contact = await contactsService.createContact(req.body);
  res.json(contact);
};

exports.updateContact = async (req, res) => {
  const updated = await contactsService.updateContact(req.params.id, req.body);
  res.json(updated);
};

exports.deleteContact = async (req, res) => {
  const deleted = await contactsService.deleteContact(req.params.id);
  res.json(deleted);
};
