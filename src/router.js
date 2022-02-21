import Router from "vue-router"
import Vue from "vue"
//views
import Home from "./views/Home"
import noFound from "./views/noFound"
import CoinDetail from "./views/CoinDetail"


Vue.use(Router)

export default new Router({

    mode: "history",
    routes:[
        {
            path:"/",
            name:"Home",
            component: Home
        },
        {
            path:"/coin/:id",
            name:"coin-detail",
            component: CoinDetail
        },
        {
            path:"*",
            name:"error",
            component: noFound
        },
    ]
})