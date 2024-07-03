import {
	parsePageParams,
	parseSearchParams,
	parseSortParams,
	type ListResult
} from '$lib/lists/shared';
import { prisma } from '$lib/server/db';
import type { User } from '@prisma/client';
import { getWorkspaceFromEventOrThrow } from '../../shared.server.js';
import type { PageServerLoadEvent } from './$types.js';

const getList = async (params: URLSearchParams, workspaceId: string): Promise<ListResult<User>> => {
	const unfilteredRecordCount = await prisma.user.count({
		where: { workspacePermissions: { none: { workspaceId } } }
	});
	const searchParams = parseSearchParams(params);
	let recordCount = unfilteredRecordCount;
	const where = searchParams.isSearch
		? {
				AND: {
					workspacePermissions: { none: { workspaceId } },
					OR: [
						{ name: { contains: searchParams.search } },
						{ email: { contains: searchParams.search } }
					]
				}
			}
		: { workspacePermissions: { none: { workspaceId } } };

	if (searchParams.isSearch) {
		recordCount = await prisma.user.count({
			where
		});
	}
	const pageParams = parsePageParams(params, recordCount);
	const sortParams = parseSortParams(params, ['id', 'name', 'email'], 'name');

	const result: ListResult<User> = {
		...searchParams,
		...pageParams,
		...sortParams,
		unfilteredRecordCount,
		records: []
	};
	if (recordCount === 0) {
		return result;
	}
	result.records = await prisma.user.findMany({
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
	const workspace = await getWorkspaceFromEventOrThrow(event);
	const params = event.url.searchParams;
	const list = await getList(params, workspace.id);
	return {
		workspace,
		list
	};
};
