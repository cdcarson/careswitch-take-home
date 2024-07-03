import { PrismaClient } from '@prisma/client';
import {
	randEmail,
	randFullName,
	randProductAdjective,
	randProductDescription,
	randAnimalType,
	randColor,
	rand,
	randNumber
} from '@ngneat/falso';
const prisma = new PrismaClient();

async function seed() {
	const users = await prisma.$transaction(async (txn) => {
		await txn.workspaceUserPermission.deleteMany();
		await txn.user.deleteMany();
		await txn.workspace.deleteMany();
		const userData = [];
		for (let i = 0; i < 4789; i++) {
			userData.push({
				name: randFullName(),
				email: randEmail()
			});
		}
		const workspaceData = [];
		for (let i = 0; i < 1078; i++) {
			workspaceData.push({
				name: [randColor(), randProductAdjective(), randAnimalType()].join(' '),
				description: randProductDescription()
			});
		}
		const users = await txn.user.createManyAndReturn({
			data: userData
		});
		const workspaces = await txn.workspace.createManyAndReturn({
			data: workspaceData
		});

		// kinda ridiculous, but whatever
		const userWorkspaceData = new Map();
		for (const user of users) {
			const num = randNumber({ min: 0, max: 17 });
			const userSpaces = rand(workspaces, { length: num });
			for (const space of userSpaces) {
				const unique = `${user.id}_${space.id}`;
				userWorkspaceData.set(unique, {
					userId: user.id,
					workspaceId: space.id
				});
			}
		}
		const userWorkspaceArr = Array.from(userWorkspaceData.values());

		await txn.workspaceUserPermission.createMany({
			data: userWorkspaceArr
		});
	});

	console.log(`Seed completed`);
}

seed().finally(async () => {
	await prisma.$disconnect();
});
