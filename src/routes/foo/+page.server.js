export async function load({ locals }: any) {
	const session = await locals.getSession();
	if (!session) {
		return {};
	}

	return {
		valid: true
	};
}
