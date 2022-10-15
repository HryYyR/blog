import { createStore } from 'vuex'

export default createStore({
    state: {
        userid:-1,
        username:'',
        token:'',
        title: 'index',
        isPC: window.innerWidth < 700 ? false : true,
        userdata: [],
        themeColor: {},  //选中的主题颜色
        themeState: '',  //主题提示问题
        themeColorOption:  //时间主题颜色
            [{ id: 0, start: "#0093E9", end: "#80D0C7", label: '早上' }, //ok
            { id: 1, start: "#FFFB7D", end: "#85FFBD", label: '中午' },  //ok
            { id: 2, start: "#f9957f", end: "#f2f5d0", label: '下午' }, //ok
            { id: 3, start: "#000000", end: "#2B86C5", label: '晚上' }, //ok

            ],
        aboutbg: null,
    },
    mutations: {
        // 获取当前时间
        getTimeState(state) {
            let timeNow = new Date();
            let hours = timeNow.getHours();
            if (hours > 5 && hours <= 10) {
                state.themeState = `早上好!`;
                state.themeColor = state.themeColorOption[0]
            } else if (hours > 10 && hours <= 14) {
                state.themeState = `中午好!`;
                state.themeColor = state.themeColorOption[1]

            } else if (hours > 14 && hours <= 18) {
                state.themeState = `下午好!`;
                state.themeColor = state.themeColorOption[2]

            } else if (hours > 18 && hours <= 24) {
                state.themeState = `晚上好!`;
                state.themeColor = state.themeColorOption[3]
            } else if (hours >= 0 && hours <= 5) {
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
