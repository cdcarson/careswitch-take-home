export const ALLOWED_RPPS = [5, 10, 25, 50, 100];
export const DEFAULT_RPP = ALLOWED_RPPS[2];

export type ParsedSortParams = {
	sort: string;
	dir: 'asc' | 'desc';
};

export type ParsedPageParams = {
	recordCount: number;
	rpp: number;
	// 1-based
	page: number;
	pageCount: number;
};

export type ParsedSearchParams = {
	isSearch: boolean;
	search: string;
};

export type ListResult<T extends Record<string, unknown>> = {
	unfilteredRecordCount: number;
	records: T[];
} & ParsedPageParams &
	ParsedSortParams &
	ParsedSearchParams;

export const parseSortParams = (
	params: URLSearchParams,
	allowedSorts: string[],
	defaultSort: string
): ParsedSortParams => {
	const sort = allowedSorts.includes(params.get('sort') || '')
		? (params.get('sort') as string)
		: defaultSort;
	const dir = params.get('dir') === 'desc' ? 'desc' : 'asc';
	return { sort, dir };
};

export const parsePageParams = (params: URLSearchParams, recordCount: number): ParsedPageParams => {
	const rpp = ALLOWED_RPPS.includes(parseInt(params.get('rpp') || ''))
		? parseInt(params.get('rpp') || '')
		: DEFAULT_RPP;
	const pageCount = Math.ceil(recordCount / rpp);
	let page = params.get('page') ? parseInt(params.get('page') || '') : 1;
	// page can be 0 if recordCount is 0
	page = Math.max(0, Math.min(page, pageCount));
	return { recordCount, rpp, page, pageCount };
};

export const parseSearchParams = (params: URLSearchParams): ParsedSearchParams => {
	const search = params.get('search') || '';
	const isSearch = search.length > 0;
	return { isSearch, search };
};

export type ListLabels = {
	singular: string;
	plural: string;
};
