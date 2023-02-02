import path from 'path';

import { json } from '@sveltejs/kit';

export async function POST({ cookies, locals, request }) {
	const session = await locals.getSession();
	if (!session) {
		return json({ error: true });
	}

	return json({});
}
