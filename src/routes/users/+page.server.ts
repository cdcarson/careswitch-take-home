import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { User } from '@prisma/client';
import type { PageServerLoadEvent } from './$types';
import type { UserListItem } from './shared';
const getList = async (params: URLSearchParams): Promise<ListResult<UserListItem>> => {
	const unfilteredRecordCount = await prisma.user.count();
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	if (searchParams.isSearch) {
		recordCount = await prisma.user.count({
			where: {
				OR: [
					{ name: { contains: searchParams.search } },
					{ email: { contains: searchParams.search } }
				]
			}
		});
		recordCount = await prisma.user.count({ where: { name: { contains: searchParams.search } } });
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(
		params,
		['id', 'name', 'email', 'workspacePermissions'],
		'name'
	);
	const result: ListResult<UserListItem> = {
		...searchParams,
		...pageParams,
		...sortParams,
		unfilteredRecordCount,
		records: []
	};
	if (recordCount === 0) {
		return result;
	}
	const where = searchParams.isSearch
		? {
				OR: [
					{ name: { contains: searchParams.search } },
					{ email: { contains: searchParams.search } }
				]
			}
		: undefined;
	const orderBy =
		sortParams.sort === 'workspacePermissions'
			? {
					workspacePermissions: {
						_count: sortParams.dir
					}
				}
			: {
					[sortParams.sort]: sortParams.dir
				};
	result.records = await prisma.user.findMany({
		where,
		include: {
			_count: {
				select: { workspacePermissions: true }
			}
		},
		take: pageParams.rpp,
		skip: pageParams.rpp * (pageParams.page - 1),
		orderBy
	});
	return result;
};

export const load = async (event: PageServerLoadEvent) => {
	const list = await getList(event.url.searchParams);
	return { list };
};
