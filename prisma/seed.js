import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const customersPath = path.join(process.cwd(), 'dataPhase2/customer.json')
const sellersPath = path.join(process.cwd(), 'dataPhase2/seller.json')
const purchasesPath = path.join(process.cwd(), 'dataPhase2/purchase.json')

async function main() {
	try {
		
		const sellers = await fs.readJSON(sellersPath)
		const customers = await fs.readJSON(customersPath)
		const purchases = await fs.readJSON(purchasesPath)


		for (const customer of customers) await prisma.customer.create({ data: customer })
		for (const purchase of purchases) await prisma.purchase.create({ data: purchase })
		for (const seller of sellers) await prisma.seller.create({ data: seller })
	
		
		

		console.log("Seeded successfully");

	} catch (error) {
		console.log(error);
		return { error: error.message }
	}
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