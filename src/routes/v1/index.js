const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const teamRoute = require('./team.route');
const templateRoute = require('./template.route');
const questionRoute = require('./question.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/teams',
    route: teamRoute,
  },
  {
    path: '/templates',
    route: templateRoute,
  },
  {
    path: '/questions',
    route: questionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
