const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const json = require('koa-json');

const router = new KoaRouter();

const app = new Koa();

//Json  Prettier Middleware
app.use(json());

// Replace with database
const things = ['My car', 'Programing', 'Playing games'];

//Simple Middleware example
// app.use(async ctx => ctx.body = { msg: "This is a json"});

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,

});

//Index
router.get('/', async ctx => {
    await ctx.render('index', {
        title:'Things that I love',
        things: things,
        
    });
})

router.get('/test', ctx => {
    ctx.body = "hello test"
});

//Router middleware
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server started...');
    console.log(`Click here>>> http://localhost:${PORT}`)
});