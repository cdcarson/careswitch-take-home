import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { PageServerLoadEvent } from '../$types';
import { getWorkspaceFromEventOrThrow } from '../shared.server';
import type { WorkspaceUserListItem } from './shared';

const getList = async (
	params: URLSearchParams,
	workspaceId: string
): Promise<ListResult<WorkspaceUserListItem>> => {
	const unfilteredRecordCount = await prisma.workspaceUserPermission.count({
		where: { workspaceId }
	});
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	let where = searchParams.isSearch
		? {
				AND: {
					workspaceId,
					user: {
						OR: [
							{ name: { contains: searchParams.search } },
							{ email: { contains: searchParams.search } }
						]
					}
				}
			}
		: { workspaceId };

	if (searchParams.isSearch) {
		recordCount = await prisma.workspaceUserPermission.count({
			where
		});
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(params, ['id', 'name', 'email'], 'name');
	const result: ListResult<WorkspaceUserListItem> = {
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
			user: true
		},
		orderBy: {
			user: {
				[sortParams.sort]: sortParams.dir
			}
		},
		take: pageParams.rpp,
		skip: pageParams.rpp * (pageParams.page - 1)
	});

	return result;
};

export const load = async (event: PageServerLoadEvent) => {
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const list = await getList(event.url.searchParams, event.params.workspaceId);
	return { list, workspace };
};
