export default async (ctx, next) => {
	ctx.conn = await ctx.app.pool.acquire();
	try {
		await next();
	} finally {
		if (ctx.conn) ctx.conn.release();
	}
};
