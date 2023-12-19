const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import vocabularyEntries from "../../../../data/vocabEntries"

async function addEntries() {
  try {
    const createdEntries = await prisma.Vocabulary.createMany({
      data: vocabularyEntries,
    });

    console.log('Entries added successfully:', createdEntries);
    console.log(vocabularyEntries);
  } catch (error) {
    console.error('Error adding entries:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default addEntries;
