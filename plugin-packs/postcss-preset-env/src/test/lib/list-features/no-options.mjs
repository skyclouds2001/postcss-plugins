import { testLogger } from '../../log/test-logger.mjs';
import { strict as assert } from 'assert';
import { dumpLogs, resetLogger } from '../../../log/helper.mjs';
import { listFeatures } from '../../../lib/list-features.mjs';
import { cssdb }  from './cssdb-fixture.mjs';

const logger = testLogger();

resetLogger();
assert.deepStrictEqual(
	cleanResult(listFeatures(cssdb, {})),
	[
		{
			browsers: [
				'ie >= 1',       'edge < 79',
				'firefox < 1',   'chrome < 1',
				'safari < 3',    'opera < 15',
				'ios_saf < 1',   'android < 65',
				'op_mob < 14',   'and_chr < 18',
				'and_ff < 4',    'and_uc >= 1',
				'samsung < 1.0', 'and_qq >= 1',
				'baidu >= 1',    'kaios >= 1',
			],
			vendors_implementations: 3,
			pluginOptions: { subFeatures: { areaHrefNeedsFixing: true } },
			id: 'any-link-pseudo-class',
		},
	],
);

dumpLogs(logger);
assert.deepStrictEqual(
	logger.getLogs(),
	[
		'Using features from Stage 2 (default)',
		'  blank-pseudo-class with stage 1 has been disabled',
		'Adding area[href] fallbacks for ":any-link" support in Edge and IE.',
	],
);

function cleanResult(res) {
	return res.map((x) => {
		if (!x.plugin) {
			throw new Error(`feature "${x.id}" must have a plugin`);
		}
		delete x.plugin;
		return x;
	});
}
