const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const index = require('./routes/index');
const order = require('./routes/order');
const channelManagement = require('./routes/channelManagement');
const area = require('./routes/area');
const replenishment = require('./routes/replenishment');
const functionLog = require('./routes/functionLog');
const inventoryChange = require('./routes/inventoryChange');
const member = require('./routes/member');
const saleOrder = require('./routes/saleOrder');
const refund = require('./routes/refund');
const employeeManagement = require('./routes/employeeManagement');
const dictionary = require('./routes/dictionary');
const roleManagement = require('./routes/roleManagement');
const authManagement = require('./routes/authManagement');
const departmentManagement = require('./routes/departmentManagement');
const merchantManagement = require('./routes/merchantManagement');
const invoice = require('./routes/invoice');
const goods = require('./routes/goods');
const report = require('./routes/report');
const goodsCategory = require('./routes/goodsCategory');
const replenisher = require('./routes/replenisher');
const boxManagement = require('./routes/boxManagement');
const boxEvent = require('./routes/boxEvent');
const collectionEdition = require('./routes/collectionEdition');
const masterControl = require('./routes/masterControl');
const selling = require('./routes/selling');
const expansionBoard = require('./routes/expansionBoard');
const cargoArea = require('./routes/cargoArea');
const door = require('./routes/door');
const operatorManagement = require('./routes/operatorManagement');
const firmwareManagement = require('./routes/firmwareManagement');
const boxUpgrade = require('./routes/boxUpgrade');
const orderReport = require('./routes/orderReport');
const collectionDetail = require('./routes/collectionDetail');
const salesDetail = require('./routes/salesDetail');
const boxStatus = require('./routes/boxStatus');
const dailyReceipt = require('./routes/dailyReceipt');

const winningNote = require('./routes/winningNote');
const RandomRemissionSetting = require('./routes/randomRemissionSetting');
const WeChatDraw = require('./routes/weChatDraw');
const activite = require('./routes/activite');
const recommendedAwards = require('./routes/recommend');

const distribution = require('./routes/distribution');
const coupon = require('./routes/coupon');
const user = require('./routes/user');
const weixin = require('./routes/weixin');
const statistics = require('./routes/statistics');
const winningRecord = require('./routes/winningRecord');
const purchasingRules = require('./routes/purchasingRules');
const withdraw = require('./routes/withdraw');
const memberType = require('./routes/memberType');
const message = require('./routes/message');
const releaseRecord = require('./routes/releaseRecord');
const releaseSetting = require('./routes/releaseSetting');
const giftRollSetting = require('./routes/giftRollSetting');
const couponList = require('./routes/couponList');
const randomRemissionRule = require('./routes/randomRemissionRule');
const realTimeStatus = require('./routes/realTimeStatus');
const invoiceDetails = require('./routes/invoiceDetails');
const merchantSplitReport = require('./routes/merchantSplitReport');
const newsManagement = require('./routes/newsManagement');
const RFIDToBox = require('./routes/RFIDToBox');
const purchasingManagement = require('./routes/purchasingManagement');

const salesSummary = require('./routes/salesSummary');
const orderCorrection = require('./routes/orderCorrection');
const addOrderCorrection = require('./routes/addOrderCorrection');
const messageSettings = require('./routes/messageSettings');
const notification = require('./routes/notification');
const trader = require('./routes/trader');
const cashFlowRecord = require('./routes/cashFlowRecord');
const myWorkOrder = require('./routes/myWorkOrder');
const terminalManagement = require('./routes/terminalManagement');

const modules = require('./modules');
const applicationPurchase = require('./routes/applicationPurchase');
const purchasingAgent = require('./routes/purchasingAgent');
const verificationRecord = require('./routes/verificationRecord');
const adminOrderReport = require('./routes/adminOrderReport');
const realTimeInventory = require('./routes/realTimeInventory');
const merchantShareStatistics = require('./routes/merchantShareStatistics');

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
onerror(app);
app.use(cors({
  origin: (ctx) => {
    if (ctx.url === '/test') {
      return false;
    }
    return `${getLocalIps(9003)}`;
    // return 'http://192.168.1.212:9003';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
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
[index,
  order,
  channelManagement,
  area,
  refund,
  dictionary,
  employeeManagement,
  roleManagement,
  authManagement,
  departmentManagement,
  merchantManagement,
  report,
  goods,
  replenishment,
  inventoryChange,
  member,
  functionLog,
  saleOrder,
  goodsCategory,
  boxManagement,
  boxEvent,
  replenisher,
  invoice,
  collectionEdition,
  masterControl,
  selling,
  expansionBoard,
  cargoArea,
  door,
  operatorManagement,
  firmwareManagement,
  boxUpgrade,
  recommendedAwards,
  orderReport,
  collectionDetail,
  salesDetail,
  winningNote,
  distribution,
  coupon,
  user,
  weixin,
  goods,
  statistics,
  dictionary,
  RandomRemissionSetting,
  WeChatDraw,
  activite,
  winningRecord,
  purchasingRules,
  withdraw,
  memberType,
  message,
  releaseRecord,
  releaseSetting,
  giftRollSetting,
  couponList,
  randomRemissionRule,
  boxStatus,
  realTimeStatus,
  dailyReceipt,
  invoiceDetails,
  merchantSplitReport,
  newsManagement,
  RFIDToBox,
  purchasingManagement,
  salesSummary,
  orderCorrection,
  addOrderCorrection,
  messageSettings,
  notification,
  trader,
  cashFlowRecord,
  myWorkOrder,
  applicationPurchase,
  purchasingAgent,
  verificationRecord,
  terminalManagement,
  adminOrderReport,
  realTimeInventory,
  merchantShareStatistics
].forEach(d => app.use(d.routes(), d.allowedMethods()));
// 模块
modules.forEach(d => app.use(d.routes(), d.allowedMethods()));
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
