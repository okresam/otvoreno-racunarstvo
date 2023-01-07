import { createStore } from 'vuex'
import user from '../store/modules/user'

const store = createStore({
    state() {
        return {
            isLoggedIn: false
        }
    },
    modules: {
        user,

    }
})

export default store