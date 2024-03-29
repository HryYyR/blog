import { createStore } from 'vuex'

export default createStore({
    state: {
        bgcolor: '#fff',
        fontcolor: '#000',
        language: localStorage.getItem('language') || 'ch',//语言
        checkPage: 0,

        userid: -1,
        username: '',
        userdata: [],
        userinfo: {},

        token: '',
        header: '',
        title: 'index',

        isVisibelUserDrawer: false,
        isPC: window.innerWidth < 700 ? false : true,


        currentColorTheme: new Date().getHours() > 18 ? true : false,
        themeColor: {},  //选中的主题颜色
        themeState: '',  //主题提示问题
        themeColorOption:  //时间主题颜色
            [{ id: 0, color: "#0093E9", label: '早上' }, //ok
            { id: 1, color: "#FFFB7D", label: '中午' },  //ok
            { id: 2, color: "#f9957f", label: '下午' }, //ok
            // { id: 3, start: "#000000", end: "#2B86C5", label: '晚上' }, //ok
            { id: 3, color: "RGB(34,108,158)", label: '晚上' }, //ok

            ],

        aboutbg: null,
    },
    mutations: {
        // 获取当前时间
        getTimeState(state) {
            let timeNow = new Date();
            let hours = timeNow.getHours();
            if (hours > 5 && hours <= 11) {
                state.themeState = `早上好!`;
                state.themeColor = state.themeColorOption[0]
            } else if (hours > 11 && hours <= 13) {
                state.themeState = `中午好!`;
                state.themeColor = state.themeColorOption[1]

            } else if (hours > 13 && hours <= 18) {
                state.themeState = `下午好!`;
                state.themeColor = state.themeColorOption[2]

            } else if (hours > 18 && hours <= 24 || hours >= 0 && hours <= 5) {
                state.themeState = `晚上好!`;
                state.themeColor = state.themeColorOption[3]
            }
            return state;
        },

    },
    actions: {
    },
    modules: {
    }
})
