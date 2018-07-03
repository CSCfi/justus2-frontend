'use strict';

angular.module('AuthService', [])
.service('AuthService', [
  function() {
    this.storeUserInfo = (user) => {
      localStorage.setItem('justusUser', JSON.stringify(user));
    };

    this.getUserInfo = () => {
      return JSON.parse(localStorage.getItem('justusUser'));
    };

      this.storeLanguage = (language) => {
          localStorage.setItem('lang', JSON.stringify(language));
      };

      this.getLanguage = () => {
          return JSON.parse(localStorage.getItem('lang'));
      };
  }
]);
