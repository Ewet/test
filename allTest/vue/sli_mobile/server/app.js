const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const order = require('./routes/order');
const refund = require('./routes/refund');
const invoice = require('./routes/invoice');
const draw = require('./routes/draw');
const prize = require('./routes/prize');
const wxo2redirect = require('./routes/wxo2redirect');
const weixin = require('./routes/weixin');
const agentRecommended = require('./routes/agentRecommended');
const purchaseOrder = require('./routes/purchaseOrder');
const tally = require('./routes/tally');
const differenceDetails = require('./routes/differenceDetails');
const replenishment = require('./routes/replenishment');
// const dictionary = require('./routes/dictionary');
const wxjssdk = require('./routes/wxjssdk');
const goods = require('./routes/goods');
const myBox = require('./routes/myBox');
const exceptionHandling = require('./routes/exceptionHandling');
const replenishmentRecord = require('./routes/replenishmentRecord');
const shopCar = require('./routes/shopCar');
const purchaseRegister = require('./routes/purchaseRegister');
const sweepCodePayment = require('./routes/sweepCodePayment');
const purchaseRefund = require('./routes/purchaseRefund');
const bsUser = require('./boxserverRoutes/user');
const modules = require('./modules');
const purchaseApplication = require('./routes/purchaseApplication');
const merchant = require('./routes/merchant');

const cors = require('koa2-cors');
const os = require('os');
function getLocalIps (port) {
  var ifaces = os.networkInterfaces();
  var address = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(x => {
      if (x.address.indexOf('192') !== -1) {
        address = `http://${x.address}:${port}`;
      }
    });
  }
  return address;
};
// error handler
onerror(app);
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === '/test') {
      return false;
    }
    return `${getLocalIps(9001)}`;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'x-session-id', 'X-Token']
}));
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
[
  index,
  order,
  refund,
  invoice,
  draw,
  prize,
  wxo2redirect,
  weixin,
  agentRecommended,
  purchaseOrder,
  goods,
  myBox,
  tally,
  replenishment,
  exceptionHandling,
  replenishmentRecord,
  shopCar,
  purchaseRegister,
  sweepCodePayment,
  purchaseRefund,
  differenceDetails,
  bsUser,
  purchaseApplication,
  merchant,
  differenceDetails
].forEach(d => app.use(d.routes(), d.allowedMethods()));
// app.use(index.routes(), index.allowedMethods());
app.use(wxjssdk.routes(), wxjssdk.allowedMethods());

modules.forEach(d => app.use(d.routes(), d.allowedMethods()));

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
