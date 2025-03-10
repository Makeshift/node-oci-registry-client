import * as assert from 'assert';

import { RegistryClientV2 } from '../lib/registry-client-v2';
import { parseRepo } from '../lib/common';

// --- globals

const REPO = 'public.ecr.aws/karpenter/karpenter';

// --- Tests

jest.setTimeout(20 * 1000);

const repo = parseRepo(REPO);

it('v2 public.ecr.aws / > 1000 tags', async () => {
	const client = new RegistryClientV2({ repo });
	const tags = await client.listTags();
	assert(tags);
	assert.equal(tags.name, repo.remoteName);
	assert(tags.tags.length > 1000, 'not enough tags');
});
