const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getNotesForContact = async (contactId) => {
  return prisma.note.findMany({
    where: { contactId },
    orderBy: { createdAt: "desc" },
  });
};

exports.createNote = async (contactId, data) => {
  return prisma.note.create({
    data: {
      contactId,
      title: data.title || null,
      body: data.body,
    },
  });
};

exports.updateNote = async (noteId, data) => {
  return prisma.note.update({
    where: { id: noteId },
    data: {
      title: data.title || null,
      body: data.body,
    },
  });
};

exports.deleteNote = async (noteId) => {
  return prisma.note.delete({
    where: { id: noteId },
  });
};
