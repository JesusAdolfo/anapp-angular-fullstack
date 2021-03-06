'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import ngFileUpload from 'ng-file-upload';
import ngInfiniteScroll from 'ng-infinite-scroll';
import datepicker from 'angularjs-datepicker';
import moment from 'moment';
import angularMoment from 'angular-moment';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';

//alerts
import sweetalerts from 'sweetalert';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import DiputadosComponent from './diputados/diputados.component';
import agendaComponent from './agenda/agenda.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('anppApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  uiBootstrap, _Auth, account, admin, DiputadosComponent, agendaComponent, navbar, footer, main, constants, socket, util,
  ngFileUpload, '720kb.datepicker', angularMoment, ngInfiniteScroll, sweetalerts
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, amMoment) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['anppApp'], {
      strictDi: true
    });
  });
