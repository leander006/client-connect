const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")
async function main() {
  const alice = await prisma.user.upsert({
    where: { id: 1},
    update: {},
    create: {
      password: await bcrypt.hash('alice', Number(process.env?.SALT) || 0 ) ,
      name: 'alice',
    },
  })
  const bob = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      password: await bcrypt.hash('bob', Number(process.env?.SALT) || 0 ) ,
      name: 'bob',
    },
  })

  const dom = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      password: await bcrypt.hash('dom', Number(process.env?.SALT) || 0 ) ,
      name: 'dom',
    },
  })
  console.log({ alice, bob,dom })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })