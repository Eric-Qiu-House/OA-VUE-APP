"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[5896],{14853:function(t,e,l){l.r(e),l.d(e,{default:function(){return y}});var s=l(20641);function i(t,e,l,i,o,n){const r=(0,s.g2)("el-alert"),a=(0,s.g2)("sc-video"),u=(0,s.g2)("el-card"),c=(0,s.g2)("el-col"),p=(0,s.g2)("el-row"),v=(0,s.g2)("el-main");return(0,s.uX)(),(0,s.Wv)(v,null,{default:(0,s.k6)((()=>[(0,s.bF)(r,{title:"播放器使用来自西瓜视频的西瓜播放器xgplayer",type:"success",style:{"margin-bottom":"20px"}}),(0,s.bF)(p,{gutter:15},{default:(0,s.k6)((()=>[(0,s.bF)(c,{lg:12},{default:(0,s.k6)((()=>[(0,s.bF)(u,{shadow:"never",header:"MP4点播"},{default:(0,s.k6)((()=>[(0,s.bF)(a,{src:o.playUrl,options:o.options},null,8,["src","options"])])),_:1})])),_:1}),(0,s.bF)(c,{lg:12},{default:(0,s.k6)((()=>[(0,s.bF)(u,{shadow:"never",header:"HlS(m3u8)直播"},{default:(0,s.k6)((()=>[(0,s.bF)(p,{gutter:1},{default:(0,s.k6)((()=>[(0,s.bF)(c,{span:12},{default:(0,s.k6)((()=>[(0,s.bF)(a,{src:o.liveUrl,isLive:"",options:{volume:0}},null,8,["src"])])),_:1}),(0,s.bF)(c,{span:12},{default:(0,s.k6)((()=>[(0,s.bF)(a,{src:o.liveUrl_2,isLive:"",options:{volume:0}},null,8,["src"])])),_:1})])),_:1}),(0,s.bF)(p,{gutter:1,style:{"margin-top":"1px"}},{default:(0,s.k6)((()=>[(0,s.bF)(c,{span:12},{default:(0,s.k6)((()=>[(0,s.bF)(a,{src:o.liveUrl_3,isLive:"",options:{volume:0}},null,8,["src"])])),_:1}),(0,s.bF)(c,{span:12},{default:(0,s.k6)((()=>[(0,s.bF)(a,{src:o.liveUrl_4,isLive:"",options:{volume:0}},null,8,["src"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}const o={class:"sc-video",ref:"scVideo"};function n(t,e,l,i,n,r){return(0,s.uX)(),(0,s.CE)("div",o,null,512)}var r=l(35614),a=l.n(r),u=l(17216),c=l.n(u),p={props:{src:{type:String,required:!0,default:""},autoplay:{type:Boolean,default:!1},controls:{type:Boolean,default:!0},loop:{type:Boolean,default:!1},isLive:{type:Boolean,default:!1},options:{type:Object,default:()=>{}}},data(){return{player:null}},watch:{src(t){this.player.hasStart?this.player.src=t:this.player.start(t)}},mounted(){this.isLive?this.initHls():this.init()},methods:{init(){this.player=new(a())({el:this.$refs.scVideo,url:this.src,autoplay:this.autoplay,loop:this.loop,controls:this.controls,fluid:!0,lang:"zh-cn",...this.options})},initHls(){this.player=new(c())({el:this.$refs.scVideo,url:this.src,autoplay:this.autoplay,loop:this.loop,controls:this.controls,fluid:!0,isLive:!0,ignores:["time","progress"],lang:"zh-cn",...this.options})}}},v=l(66262);const d=(0,v.A)(p,[["render",n],["__scopeId","data-v-f6306a2e"]]);var h=d,f={name:"scvideo",components:{scVideo:h},data(){return{playUrl:"https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-720.mp4",options:{poster:"https://fastly.jsdelivr.net/gh/scuiadmin/CDN/video/scui-player-demo-1080_Moment.jpg",pip:!0},liveUrl:"http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv1.m3u8",liveUrl_2:"http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv6.m3u8",liveUrl_3:"http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv7.m3u8",liveUrl_4:"http://local.live.jxtvcn.com.cn/live-jxtv/tv_jxtv8.m3u8"}},mounted(){},methods:{}};const m=(0,v.A)(f,[["render",i]]);var y=m}}]);