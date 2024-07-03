import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { Workspace } from '@prisma/client';
import { getUserFromEventOrThrow } from '../../shared.server.js';
import type { PageServerLoadEvent } from './$types.js';

const getList = async (params: URLSearchParams, userId: string): Promise<ListResult<Workspace>> => {
	const unfilteredRecordCount = await prisma.workspace.count({
		where: { userPermissions: { none: { userId } } }
	});
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	const where = searchParams.isSearch
		? {
				AND: {
					userPermissions: { none: { userId } },
					OR: [{ name: { contains: searchParams.search } }]
				}
			}
		: { userPermissions: { none: { userId } } };

	if (searchParams.isSearch) {
		recordCount = await prisma.user.count({
			where
		});
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(params, ['id', 'name'], 'name');

	const result: ListResult<Workspace> = {
		...searchParams,
		...pageParams,
		...sortParams,
		unfilteredRecordCount,
		records: []
	};
	if (recordCount === 0) {
		return result;
	}
	result.records = await prisma.workspace.findMany({
		where,
		orderBy: {
			[sortParams.sort]: sortParams.dir
		},
		skip: pageParams.rpp * (pageParams.page - 1),
		take: pageParams.rpp
	});
	return result;
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const params = event.url.searchParams;
	const list = await getList(params, user.id);
	return {
		user,
		list
	};
};
