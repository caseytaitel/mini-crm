const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getContacts = async () => {
  return prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

exports.createContact = async (data) => {
  return prisma.contact.create({
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
    },
  });
};

exports.updateContact = async (id, data) => {
  return prisma.contact.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
    },
  });
};

exports.deleteContact = async (id) => {
  // Notes will be deleted automatically by Prisma because of the relation
  return prisma.contact.delete({
    where: { id: Number(id) },
  });
};