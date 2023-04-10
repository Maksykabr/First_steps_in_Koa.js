const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

const router = new KoaRouter();
const app = new Koa();


//Json  Prettier Middleware
app.use(json());

app.use(bodyParser());

// Add atitional properties to context
app.context.user = 'Maks';

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

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

//list of things
async function index(ctx) {
    await ctx.render('index', {
        title:'Things that I love',
        things: things,
        
    });
};

//Show add page
async function showAdd(ctx) {
    await ctx.render('add');
};

//Add thing
async function add(ctx) {
    const body = ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
};


router.get('/test', ctx => {
    ctx.body = `Hello ${ctx.user}`
});

//Router middleware
app.use(router.routes()).use(router.allowedMethods());

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server started...');
    console.log(`Click here>>> http://localhost:${PORT}`)
});