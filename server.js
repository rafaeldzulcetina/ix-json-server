const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router(require('./db.js')())
const router = jsonServer.router('db_salesroom.json')
const middlewares = jsonServer.defaults()
const parse = require('parse-link-header');

server.use(jsonServer.rewriter({
    "/salesRoom?pageNumber=:pageNumber&size=:size" : "/salesRoom?_page=:pageNumber&_limit=:size",
}))

router.render = (req, res) => {
    console.log("method--->", req.method)
    switch (req.method) {
        case 'GET':
            if(req.query.id){
                console.log("method---> id")
                res.jsonp({
                    data: {
                        items :res.locals.data.items,
                    },
                    errors: [],
                    warnings: []
                })
            }else if (!req.originalUrl.includes('_page')){
                console.log("method---> no_page")
                res.jsonp({
                    data: {
                        items :res.locals.data,
                    },
                    errors: [],
                    warnings: []
                })
            }
            if(req.originalUrl.includes('_page')){

                //this.perPage = req.originalUrl.charAt(req.originalUrl.length - 1)
                const arrayString = req.originalUrl.split('=');

                this.perPage = arrayString[arrayString.length - 1]

                console.log(this.perPage)
                //Verificar si se puede paginar
                if(res.get('link') !== ''){
                    const pagination = parse(res.get('link'));
                    console.log(pagination)
                    // preguntar por pagination.prev
                    this.limit = Number(pagination.next._limit)
                    this.currentPage = (Number(pagination.next._page) -1)

                    this.lastPage = pagination.last._page
                    this.total = this.limit
                }else{
                    this.limit = res.locals.data.length - 1
                    this.currentPage = 1
                    this.lastPage = 1
                }
                //const limit = Number(pagination.last._limit)
                res.jsonp({
                    data: {
                        items :res.locals.data,
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
