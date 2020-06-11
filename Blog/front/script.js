

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
            this.broder = true;
        }
    },

    template: '<div id="searchContent" @mouseenter="changeBroder" v-bind:class="{bigger: broder, smaller: !broder}"><div><button><img src="image/search.png"></button><input type="text"/></div></div>'
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
        } 
    },

    created: function () {

    },

    mounted: function () {

    },

    router: router,
})