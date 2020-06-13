
var homeTemplate = {
    props: ['arr'],
    template: '<div><div class="blogContent" v-for="item in arr"><div class="title">{{item.title}}</div><div class="date">{{item.date}}</div></div></div>'
}

Vue.component('home', homeTemplate);    // home element

var searchTemplate = {
    props:['arr'],
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
    props:['arr'],
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
        blogArray: [],
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
    /**
     * get mdarray by axios
     */
    created: function () {
        axios({
            url:'http://127.0.0.1:3000/getmdarray', 
        }).then((obj)=>{
            for(let i = 0; i < obj.data.length; ++i){
                var dateStr = new Date(obj.data[i].date);
                var year = dateStr.getFullYear();
                var month = dateStr.getMonth() + 1;
                var day = dateStr.getDay();
                var res = `${year}-${month}-${day}`;
                obj.data[i].date = res;
                this.blogArray.push(obj.data[i]);
            }
        });
    },

    mounted: function () {
        window.addEventListener('scroll', this.scrollToTop)
    },

    destroyed: function() {
        window.removeEventListener('scroll', this.scrollToTop);
    },

    router: router,
})