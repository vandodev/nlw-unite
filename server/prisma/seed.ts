//npx prisma db seed
import { prisma } from '../src/lib/prisma'

async function seed() {
  const eventId = 'dc8ccb07-ad81-467a-8859-df6c14446e8f'

  await prisma.event.create({
    data: {
      id: eventId,
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})