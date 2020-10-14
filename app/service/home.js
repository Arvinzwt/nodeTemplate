const Service = require('egg').Service;

class HomeService extends Service {
    async home(page=1){
        return [{ id: 1, title: 'this is news 1', url: '',time:1602668328 }]
    }
}
module.exports = HomeService;
