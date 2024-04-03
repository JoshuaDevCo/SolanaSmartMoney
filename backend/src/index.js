import express from 'express';
import config from './config';

import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';

import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';

import { guard, newToken } from './utils/auth';

require('./subscribe_txs_token')
require('./trade_indexer')
const txAanalyzer = require('./tx_analyzer')
const { targetTokenPrice } = require('./bird_api')

const app = express();

//* CONFIG *//
app.disable('x-powered-by'); //? Disable default header

app.use(cors()); //? CORS Enabled
app.use(json()); //? Body parser for application/json POST data
app.use(urlencoded({ extended: true })); //? Body parser for application/x-www-form-urlencoded POST data

app.use(helmet()); //? Securiy Headers Default config
app.use(xss()); //? Prevent Cross Site Scripting
app.use(hpp()); //? Prevent HTTP param pollution

app.use(morgan('dev')); //? Server Logger
//* END CONFIG *//

//* ROUTES *//
app.get('/api', (req, res) => {
  res.send('API ROOT ⚡️');
});

app.get('/api/calcMetrics', (req, res) => {  
  txAanalyzer.calcMetrics(req.query.token, req.query.period)
  .then(records => {
    res.send(records)
  })
  .catch(err => {
    res.send([])
  })
})

app.get('/api/calcLiquidity', (req, res) => {  
  txAanalyzer.calcLiquidity(req.query.token, req.query.period)
  .then(records => {
    res.send(records)
  })
  .catch(err => {
    res.send([])
  })
})

app.get('/api/calcVolume', (req, res) => {  
  txAanalyzer.calcVolume(req.query.token, req.query.period)
  .then(records => {
    res.send(records)
  })
  .catch(err => {
    res.send([])
  })
})

app.get('/api/calcTxs', (req, res) => {  
  txAanalyzer.calcTxs(req.query.token, req.query.period)
  .then(records => {
    res.send(records)
  })
  .catch(err => {
    res.send([])
  })
})

app.get('/api/calcHolders', (req, res) => {  
  txAanalyzer.calcHolders(req.query.token, req.query.period)
  .then(records => {
    res.send(records)
  })
  .catch(err => {
    res.send([])
  })
})
//* END ROUTES *//

app.listen(config.port, () => {
  console.log(
    colors.underline.bgBlack.bold.brightMagenta(
      `API is Running at http://localhost:${config.port}/api`
    )
  );
});