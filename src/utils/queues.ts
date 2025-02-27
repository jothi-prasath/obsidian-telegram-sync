type AsyncStaticFunction<A extends unknown[] = unknown[], R = unknown> = (...args: A) => Promise<R>;
type AsyncInstanceFunction<C = undefined, A extends unknown[] = unknown[], R = unknown> = (
	this: C,
	...args: A
) => Promise<R>;
const queues = new Map<string, Promise<unknown>>();

export async function enqueue<A extends unknown[], R>(fn: AsyncStaticFunction<A, R>, ...args: A): Promise<R>;
export async function enqueue<C, A extends unknown[], R>(
	context: C,
	fn: AsyncInstanceFunction<C, A, R>,
	...args: A
): Promise<R>;
export async function enqueue<C, A extends unknown[], R>(
	contextOrFn: AsyncStaticFunction<A, R> | C,
	fnOrArgs: AsyncInstanceFunction<C, A, R> | A,
	...rest: A
): Promise<R> {
	let error: Error | undefined;
	let context: C | undefined;
	let fn: AsyncStaticFunction<A, R> | AsyncInstanceFunction<C, A, R>;

	if (typeof contextOrFn === "function") {
		fn = contextOrFn as AsyncStaticFunction<A, R>;
		if (fnOrArgs) rest.unshift(fnOrArgs);
	} else {
		context = contextOrFn;
		fn = fnOrArgs as AsyncInstanceFunction<C, A, R>;
	}
	const args = rest;

	const queueKey = fn.name;
	if (!queueKey) throw new Error("Function should have a name");

	queues.set(
		queueKey,
		(queues.get(queueKey) || Promise.resolve())
			.then(async () =>
				context ? await fn.call(context, ...args) : await (fn as AsyncStaticFunction<A, R>)(...args)
			)
			.catch((e) => {
				error = e;
			})
	);

	const result = (await queues.get(queueKey)) as R;
	if (error) throw error;
	return result;
}
