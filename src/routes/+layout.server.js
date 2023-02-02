import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals, parent, isDataRequest, request }: any) {
	const session = await locals.getSession();
	if (!session.user) {
		return {};
	}

	return {
		valid: true
	};
}
