const router = require('koa-router')();
const basic = require('../functions/basic');

// Get Echoed Hello
router.get('/hello', async(ctx, next) => { // Running a command on command line needs async
  ctx.body = await basic.hello();
});

// Adding two numbers together does not need async
router.get('/addTwo/:one/:two', (ctx, next) => {
  const one = Number(ctx.params.one);
  const two = Number(ctx.params.two);
  ctx.body = basic.addTwo(one, two);
});

module.exports = router;
