import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { PageServerLoadEvent } from '../$types';
import { getUserFromEventOrThrow } from '../shared.server';
import type { UserWorkspaceListitem } from './shared';

const getList = async (
	params: URLSearchParams,
	userId: string
): Promise<ListResult<UserWorkspaceListitem>> => {
	const unfilteredRecordCount = await prisma.workspaceUserPermission.count({
		where: { userId }
	});
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	let where = searchParams.isSearch
		? {
				AND: {
					userId,
					workspace: {
						OR: [{ name: { contains: searchParams.search } }]
					}
				}
			}
		: { userId };

	if (searchParams.isSearch) {
		recordCount = await prisma.workspaceUserPermission.count({
			where
		});
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(params, ['id', 'name'], 'name');
	const result: ListResult<UserWorkspaceListitem> = {
		...searchParams,
		...pageParams,
		...sortParams,
		unfilteredRecordCount,
		records: []
	};
	if (recordCount === 0) {
		return result;
	}

	result.records = await prisma.workspaceUserPermission.findMany({
		where,
		include: {
			workspace: true
		},
		orderBy: {
			workspace: {
				[sortParams.sort]: sortParams.dir
			}
		},
		take: pageParams.rpp,
		skip: pageParams.rpp * (pageParams.page - 1)
	});

	return result;
};

export const load = async (event: PageServerLoadEvent) => {
	const user = await getUserFromEventOrThrow(event);
	const list = await getList(event.url.searchParams, event.params.userId);
	return { list, user };
};
