/* eslint-disable */
const path = require('path');
const app = require('index');
const config = require('config/config');
/* eslint-disable */

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });
}

app.listen(process.env.PORT || config.port, () =>
  console.log(`Node server listening on port ${config.port}...`));
