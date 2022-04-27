import { createRouter, createWebHistory } from 'vue-router'
import ScreenBorrowLogin from '../pages/ScreenBorrowLogin'
import ScreenBorrow from '../pages/ScreenBorrow'

const routerHistory =  createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes:[
        {
            path:"/ScreenBorrowLogin",
            component:ScreenBorrowLogin
        },
        {
            path:"/ScreenBorrow",
            component:ScreenBorrow
        }
    ]
})
export default router

