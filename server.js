const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(require('./db.js')())
const routes = require('./routes.json')
//const router = jsonServer.router('./jsons/db_salesroom.json')
//const router = jsonServer.router('./jsons/db_salesroom.json')
const middlewares = jsonServer.defaults()
const parse = require('parse-link-header');


server.use(jsonServer.rewriter(routes))

getValueParam = (url, paramName) =>{
    let value = '';
    let arrayStr = url.split('?');
    arrayStr = arrayStr[1].split('&')

    arrayStr.map((param) => {
        const [p, v] = param.split('=');

        if (p === paramName)
            value = v
    })
    return value;
}

router.render = (req, res) => {
    switch (req.method) {
        case 'GET':
            let items = res.locals.data;
            console.log(!req.originalUrl.includes('pageNumber'))
            if(req.query.id){
                res.jsonp({
                    data: {
                        items,
                    },
                    errors: [],
                    warnings: []
                })
            }else if (!req.originalUrl.includes('_page')){
                res.jsonp({
                    data: {
                        items,
                    },
                    errors: [],
                    warnings: []
                })
            }
            if(req.originalUrl.includes('_page')){
                this.perPage = getValueParam(req.originalUrl, '_limit');

                //Verificar si se puede paginar
                if(res.get('link') !== ''){
                    const pagination = parse(res.get('link'));
                    // preguntar por pagination.prev
                    this.limit = Number(pagination.next._limit)
                    this.currentPage = (Number(pagination.next._page) -1)

                    this.lastPage = pagination.last._page
                    this.total = this.limit
                }else{
                    this.limit = items.length - 1;
                    this.currentPage = 1
                    this.lastPage = 1
                }

                if(req.originalUrl.includes('startDate')){
                    this.startDate = getValueParam(req.originalUrl, 'startDate');
                    this.endDate = getValueParam(req.originalUrl, 'endDate');
                    items = items.filter((item) => (item.date >= this.startDate && item.date <= this.endDate));
                    this.limit = items.length;
                }

                //const limit = Number(pagination.last._limit)
                res.jsonp({
                    data: {
                        items,
                        currentPage: this.currentPage,
                        from: 1,
                        lastPage: this.lastPage,
                        perPage: this.perPage,
                        to: this.perPage,
                        total: this.limit
                    },
                    errors: [],
                    warnings: []
                })
            }
            break;

        case 'POST':
            res.jsonp({
                data: res.locals.data,
                errors: [],
                warnings: []
            })
            break;

        case 'PUT':
            res.jsonp({
                data: res.locals.data,
                errors: [],
                warnings: []
            })
            break;
    }
}

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
