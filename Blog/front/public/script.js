

var homeTemplate = {
    props: ['arr'],
    methods:{
        getmarkdown(src){
            return 'article?name='+src;
        }
    },

    template: '<div><div class="blogContent" v-for="item in arr"><a v-bind:href="getmarkdown(item.src)"><div class="title">{{item.title}}</div><div class="date">{{item.date}}</div></a></div></div>'
}

Vue.component('home', homeTemplate);    // home element

var searchTemplate = {
    props:['arr'],
    data(){
        return{
            broder: false,
            target: "",
        }
    },

    computed: {
        /**
        * 
        * @param {string} title the title of item 
        * Filter the array
        */

        showItem: {
            
            get(){
                var filterList = this.arr;
                return filterList.filter((item)=>{
                    return item.title.indexOf(this.target) != -1;
                });
            }
            }
        },
    

    methods:{

        /**
         * change the css class
         */
        changeBroder: function(){
            this.broder = !this.broder;
        },

        getmarkdown(src){
            return 'article?name='+src;
        }
    },

    template: '<div id="searchOuter"><div id="searchContent" @mouseenter="changeBroder" @mouseleave="changeBroder" v-bind:class="{bigger: broder, smaller: !broder}"><button><img src="/front/image/search.png"></button><input type="text" v-model="target"/></div><div id="searchList" v-if="target.length != 0"><div class="blogContent" v-for="item in showItem"><a v-bind:href="getmarkdown(item.src)"><div class="title">{{item.title}}</div><div class="date">{{item.date}}</div></a></div></div></div>'
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
        },

        /**
         * 
         * sort blogArray by date
         */
        compare(time){
            return function(m,n){
                var a = new Date(m[time]);
                var b = new Date(n[time]);
                return b - a; 
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
            this.blogArray.sort(this.compare("date"));
            console.log(this.blogArray);
        });
    },

    mounted: function () {
        window.addEventListener('scroll', this.scrollToTop);
        this.blogArray.sort(this.compare("date"));
    },

    destroyed: function() {
        window.removeEventListener('scroll', this.scrollToTop);
    },

    router: router,
})