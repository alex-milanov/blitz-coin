'use strict';

const crypto = require('crypto');

const pipe = (a, b) => (...args) => b(a(...args));
const assignProc = (o, k, proc) =>  Object.assign({}, o, {
	[k]: proc(o)	
})

const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex');

const create = (index, timestamp, data, prevHash) => assignProc(
	{index, timestamp, data, prevHash}, 'hash', hash
);

const genesis = () => create(0, Date.now(), 'Genesis Block', 0)

const next = (prev) => create(prev.index + 1, Date.now(), `Hi, I am block ${prev.index + 1}`, prev.hash)

const chain = [genesis()];

for (let i = 1; i < 10; i++) {
	chain.push(next(chain[i - 1]))
}

console.log(chain);
