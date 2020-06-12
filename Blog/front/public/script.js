

var homeTemplate = {
    template: '<div class="blogContent"></div>'
}

Vue.component('home', homeTemplate);    // home element

var searchTemplate = {
    data(){
        return{
            broder: false,
        }
    },

    methods:{
        changeBroder: function(){
            this.broder = !this.broder;
        }
    },

    template: '<div id="searchContent" @mouseover="changeBroder" @mouseout="changeBroder" v-bind:class="{bigger: broder, smaller: !broder}"><div><button><img src="/front/image/search.png"></button><input type="text"/></div></div>'
}

Vue.component('search', searchTemplate);    // search element


var categoryTemplate = {
    template: '<div id="categoryContent></div>"'
}

Vue.component('category', categoryTemplate);    // category element
/**
 * create a router ovject
 */

var router = new VueRouter({
    routes: [
        {path: '/search' ,component: searchTemplate},
        {path: '/category' ,component: categoryTemplate},
        {path: '/home', component: homeTemplate}
    ]
})

var app = new Vue({
    el: '#app',
    data: {
        asideFlag: false,
        show: false,
        broder: false,
        blogArray: [

        ],
    },

    methods: {

        /**
         *  switching component
         */

        change: function () {
            this.show = true;
            this.asideFlag == false ? (this.asideFlag = true) : (this.asideFlag = false);
        },

        /**
         * Back to top
         */

        toTop: function(){
            scroll(0, 0);
        },

        smaller: function(){
            this.broder = false;
        },

        backTop() {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 16)
        },

        scrollToTop() {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 0) {
                that.btnFlag = true
            } else {
                that.btnFlag = false
            }
        }
    },

    created: function () {

    },

    mounted: function () {
        window.addEventListener('scroll', this.scrollToTop)
    },

    destroyed: function() {
        window.removeEventListener('scroll', this.scrollToTop);
    },

    router: router,
})