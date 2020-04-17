const config = require('../configuration/config')
const routes = require('../lib/routes')

class RouteManager {
    //route = routes;

    //_version = config.API_VERSION;
    get version() {
        return `v${this._version}`;
    }

    get baseUrl() {
        return `/api/${this.version}`;
    }

    getModuleUrl(moduleRoute) {
        // return `${this.baseUrl}${moduleRoute}`;
        // console.log('moduleRoute',`${moduleRoute}`)
        return `${moduleRoute}`;
    }

    constructor() {
        this.route = routes;
        this._version = config.API_VERSION
    }
}

module.exports = new RouteManager();
