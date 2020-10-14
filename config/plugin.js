'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    static: {
      enable: true,
    },
    nunjucks:{
        enable: true,
        package: 'egg-view-nunjucks'
    }
};
