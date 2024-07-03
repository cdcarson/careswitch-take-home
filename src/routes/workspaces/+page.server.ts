import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { WorkspaceListItem } from './shared';
import type { PageServerLoadEvent } from './$types';

const getList = async (params: URLSearchParams): Promise<ListResult<WorkspaceListItem>> => {
	const unfilteredRecordCount = await prisma.workspace.count();
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	if (searchParams.isSearch) {
		recordCount = await prisma.workspace.count({
			where: { name: { contains: searchParams.search } }
		});
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(params, ['id', 'name', 'userPermissions'], 'name');
	const result: ListResult<WorkspaceListItem> = {
		...searchParams,
		...pageParams,
		...sortParams,
		unfilteredRecordCount,
		records: []
	};
	if (recordCount === 0) {
		return result;
	}
	const where = searchParams.isSearch ? { name: { contains: searchParams.search } } : undefined;
	const orderBy =
		sortParams.sort === 'userPermissions'
			? {
					userPermissions: {
						_count: sortParams.dir
					}
				}
			: {
					[sortParams.sort]: sortParams.dir
				};
	result.records = await prisma.workspace.findMany({
		where,
		take: pageParams.rpp,
		skip: pageParams.rpp * (pageParams.page - 1),
		include: {
			_count: {
				select: { userPermissions: true }
			}
		},
		orderBy
	});
	return result;
};

export const load = async (event: PageServerLoadEvent) => {
	const list = await getList(event.url.searchParams);
	return { list };
};
