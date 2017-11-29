'use strict';

const crypto = require('crypto');

const pipe = (a, ...fns) => (...args) => fns.reduce((res, fn) => fn(res), a(...args));
const assign = (o, ...props) => Object.assign({}, o, ...props);
const keys = o => Object.keys(o);

const log = o => (console.log(o), o);

const hash = o => crypto.createHash('sha256').update(JSON.stringify(o)).digest('hex');

const create = pipe(
	(index, timestamp, data, prevHash) => ({index, timestamp, data, prevHash}),
	o => assign(o, {hash: hash(o)}),
	log
);

const genesis = () => create(0, Date.now(), 'Genesis Block', 0);

const next = prev => create(prev.index + 1, Date.now(), `Hi, I am block ${prev.index + 1}`, prev.hash);

const chain = [genesis()];

for (let i = 1; i < 10; i++) {
	chain.push(next(chain[i - 1]));
}
