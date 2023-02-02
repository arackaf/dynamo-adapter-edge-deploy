export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session) {
		return {};
	}

	return {
		valid: true
	};
}
