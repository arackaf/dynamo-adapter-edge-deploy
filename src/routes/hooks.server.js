import { sequence } from '@sveltejs/kit/hooks';
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import GoogleProvider from '@auth/core/providers/google';

import { SvelteKitAuth } from '@auth/sveltekit';

const dynamoConfig = {};
const client = DynamoDBDocument.from(new DynamoDB(dynamoConfig), {
	marshallOptions: {
		convertEmptyValues: true,
		removeUndefinedValues: true,
		convertClassInstanceToMap: true
	}
});

const auth = SvelteKitAuth({
	providers: [
		// @ts-ignore
		GoogleProvider({
			clientId: 'GOOGLE_AUTH_CLIENT_ID',
			clientSecret: 'GOOGLE_AUTH_SECRET'
		})
	],
	session: {
		maxAge: 60 * 60 * 24 * 365,
		strategy: 'jwt'
	},

	secret: 'NEXTAUTH_SECRET',

	adapter: DynamoDBAdapter(client, { tableName: 'DYNAMO_AUTH_TABLE' })
});

export async function handleFn({ event, resolve }) {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const response = await resolve(event);
	return response;
}

export const handle = sequence(handleFn, auth);
