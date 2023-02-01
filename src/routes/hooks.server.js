import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';

console.log(typeof DynamoDBAdapter);

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const response = await resolve(event);
	return response;
}
