parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"fWRU":[function(require,module,exports) {
console.log("开始执行 index.js"),PROX_GATE="https://api.imhcg.cn/api/v1/proxy";var t={template:"#template-search-header",data:function(){return{show_search_input:!1}},methods:{swich_icon_input:function(){this.show_search_input=!this.show_search_input,this.show_search_input&&this.$nextTick(function(){document.querySelector("#search-header-input").focus()})},redirect_to_search:function(t){var e="/search/?key_word="+t.target.value;this.$router.push(e),console.log("重定向到 "+e)}}},e={props:["msg"],template:"#template-back-header",methods:{go_back:function(){window.history.back()}}},o={props:["active"],template:"#template-func-swich",beforeMount:function(){this.$nextTick(function(){var t="func-swich-"+this.active;console.log("活跃标签切换到 "+t),document.querySelector("#"+t).setAttribute("class","func-swich-item-active")})}},n={components:{"search-head":t,"func-swich":o},template:"#template-mybook"},i={components:{"search-head":t,"func-swich":o},template:"#template-finding"},r={template:"#template-sort",components:{"back-head":e},data:function(){return{Sort_data:""}},beforeMount:function(){var t=this;fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"http://api.zhuishushenqi.com/cats/lv2/statistics"})}).then(function(t){return t.json()}).then(function(e){t.Sort_data=e})}},s={components:{"back-head":e},template:"#template-ranking",data:function(){return{Ranking_data:""}},beforeMount:function(){var t=this;fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"http://api.zhuishushenqi.com/ranking/gender"})}).then(function(t){return t.json()}).then(function(e){t.Ranking_data=e})}},h={components:{"back-head":e},template:"#template-search",data:function(){return{Search_data:"",key_word:""}},beforeMount:function(){var t=this;this.key_word=this.$route.query.key_word,console.log("开始搜索关键词："+this.key_word),fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"http://api.zhuishushenqi.com/book/fuzzy-search?query="+this.key_word})}).then(function(t){return t.json()}).then(function(e){t.Search_data=e})}},a={template:"#template-book-list",components:{"back-head":e},data:function(){return{gender:"",major:"",Major_data:"",major_start:0,Ranking_data:"",ranking_id:"",msg:""}},beforeMount:function(){var t=this.$route.query.action;console.log(t),"sort-major"===t?(this.gender=this.$route.query.gender,this.major=this.$route.query.major,this.get_major_sort(),this.msg=this.$route.query.msg):"ranking"===t&&(console.log("render ranking"),this.ranking_id=this.$route.query._id,this.get_ranking(),this.msg=this.$route.query.msg)},methods:{get_major_sort:function(){var t=this;fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"https://api.zhuishushenqi.com/book/by-categories?gender="+this.gender+"&type=hot&major="+this.major+"&minor=&start="+this.major_start+"&limit=10"})}).then(function(t){return t.json()}).then(function(e){t.Major_data=e})},get_ranking:function(){var t=this;fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"http://api.zhuishushenqi.com/ranking/"+this.ranking_id})}).then(function(t){return t.json()}).then(function(e){t.Ranking_data=e})},load_next_page:function(){console.log("load more"),this.major_start+=1,this.get_major_sort(),document.body.scrollTop=0,document.documentElement.scrollTop=0}}},c={template:"#template-book",components:{"back-head":e},data:function(){return{book_id:"",book_source_ajax:"",book_source_id:"",chapters:"",now_index:"",msg:"",chapter_link:"",chapter_title:"",now_chapter_content:"",is_vip:"",chapter_status:"",show_chapter_list:!1,show_control_bar:!0}},watch:{chapters:function(){console.log("检测到章节数据变动"),this.now_index?this.load_chapter():(this.now_index=0,this.load_chapter())},now_index:function(){console.log("检测到索引变动"),this.load_chapter()}},beforeMount:function(){this.book_id=this.$route.query.book_id,console.log("初始化阅读组件，书籍，id 为 ",this.book_id),this.book_source_id||(this.get_book_source(),this.msg="书源选择")},methods:{get_book_source:function(){var t=this;console.log("正在获取书源"),fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"http://api.zhuishushenqi.com/atoc?view=summary&book="+this.book_id})}).then(function(t){return t.json()}).then(function(e){t.book_source_ajax=e})},ensure_book_source:function(t){console.log("书源已确认，即将加载章节数据");var e=t.target.getAttribute("source_id");e&&(this.book_source_id=e,this.get_chapters())},get_chapters:function(){var t=this;console.log("正在获取书籍所有章节"),fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"https://api.zhuishushenqi.com/atoc/"+this.book_source_id+"?view=chapters"})}).then(function(t){return t.json()}).then(function(e){t.chapters=e})},load_chapter:function(){var t=this;console.log("正在根据索引加载当前章节"),this.chapter_link=this.chapters.chapters[this.now_index].link,this.chapter_title=this.chapters.chapters[this.now_index].title,this.msg=this.chapter_title,fetch(PROX_GATE,{method:"POST",body:JSON.stringify({url:"https://chapterup.zhuishushenqi.com/chapter/"+this.chapter_link})}).then(function(t){return t.json()}).then(function(e){t.now_chapter_content=e,e.ok?(t.chapter_status=!0,t.is_vip=t.now_chapter_content.chapter.hasOwnProperty("cpContent"),t.is_vip?t.now_chapter_content.chapter.cpContent=t.now_chapter_content.chapter.cpContent.replace(/\n/g,"<br/>"):t.now_chapter_content.chapter.body=t.now_chapter_content.chapter.body.replace(/\n/g,"<br/>"),document.querySelector("#book-area").scrollTop=0):(t.chapter_status=!1,console.log("读取章节内容出错，具体原因为："+t.now_chapter_content.message),alert("当前源好像坏了，\n建议换源再试。"))})},show_chapter_list_func:function(){console.log("切换目录/正文"),this.show_chapter_list=!this.show_chapter_list,this.show_chapter_list&&(document.querySelector("#book-area").scrollTop=0)},set_index:function(t){console.log("检测到目录操作，正在设置索引");var e=t.target.getAttribute("chapter_index");e&&(this.now_index=e,this.show_chapter_list=!this.show_chapter_list)},add_index:function(){this.now_index+=1}}},u=[{path:"/",component:n},{path:"/finding",component:i},{path:"/sort",component:r},{path:"/ranking",component:s},{path:"/search",component:h},{path:"/book-list",component:a},{path:"/book",component:c}],_=new VueRouter({routes:u}),p=new Vue({el:"#app",router:_});
},{}]},{},["fWRU"], null)
//# sourceMappingURL=/script.ed2de797.map