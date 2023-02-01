import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

import { SvelteKitAuth } from '@auth/sveltekit';

export function simulateDynamoAdapter() {
	const dynamoConfig = {};
	const client = DynamoDBDocument.from(new DynamoDB(dynamoConfig), {
		marshallOptions: {
			convertEmptyValues: true,
			removeUndefinedValues: true,
			convertClassInstanceToMap: true
		}
	});

	return SvelteKitAuth({
		adapter: DynamoDBAdapter(client, { tableName: 'DYNAMO_AUTH_TABLE' })
	});
}

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const response = await resolve(event);
	return response;
}
