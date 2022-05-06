const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router(require('./db.js')())
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const parse = require('parse-link-header');

server.use(jsonServer.rewriter({
    "/cardType" : "/cardType",
    "/cardType?pageNumber=:pageNumber&size=:size" : "/cardType?_page=:pageNumber&_limit=:size",
    //rutas post
    "/cardType/:id" : "/cardType/:id",


    "/carddetails/couples/:id": "/couples?id=:id/items",
    "/couples/:id/cards": "/couples?id=:id"
}))

//posts?_page=7&_limit=20

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
                const pagination = parse(res.get('link'));
                console.log("pagination-->")
                const limit = Number(pagination.last._limit)
                res.jsonp({
                    data: {
                        items :res.locals.data,
                        currentPage: (Number(pagination.next._page) -1),
                        from: 1,
                        lastPage: Number(pagination.last._page),
                        perPage: limit,
                        to: limit,
                        total: 2
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
