$(function(){

    // banner轮播图
    function Banner(){}
                $.extend(Banner.prototype , {
                    init:function(options){
                        /* 
                            {
                                item_list : "#list li",
                                // 非必填;
                                left_btn : "#left",
                                right_btn : "#right",
                                list_btn : "#btn_list button",
                                autoPlay : false;
                            }
                        */
                        // ---------------选择元素;
                        // 主要显示元素;
                        this.item_list = $(options.item_list);
                        console.log(this.item_list)
                        // 左按钮;
                        this.left_btn = $(options.left_btn);
                        // 右按钮;
                        this.right_btn = $(options.right_btn);
                        // 按钮列表;
                        this.list_btn = $(options.list_btn);
                        // 按钮列表父级;
                        this.list = this.item_list.parent();
                        console.log(this.list)
        
                        // --------------- 创建核心属性;
                        // 当前显示的图片下标;
                        this.nowIndex = 0;
                        // 共有多少图片显示;
                        this.item_num = this.item_list.length;
                        
                        // --------------- 调用核心方法;
                        // 如果 => 没有任何按钮 , 就不调用绑定事件方法了;
                        //         直接自动播放;
                        // this.bindEvent();
                        if(this.left_btn.length == 0 && this.right_btn.length == 0 && this.list_btn.length == 0){
                            this.autoPlay();
                        }else{
                            this.bindEvent();
                        }
        
                        if(options.autoPlay){
                            this.autoPlay();
                        }
        
                    },
                    bindEvent:function(){
                        // this.left_btn.click(this.prev.bind(this));
                        this.left_btn.click($.proxy(this.prev , this));
                        this.right_btn.click($.proxy(this.next , this));
                        this.list_btn.mouseover($.proxy(this.toIndex , this));
                    },
                    next:function(){
                        if(this.nowIndex == this.item_num - 1){
                            // 最后一张的时候做出相应的处理;
                            this.list.css({
                                left : 0 
                            })
                            this.nowIndex = 1;
                        }else{
                            this.nowIndex ++;
                        }
                        console.log(this.nowIndex);
        
                        this.animate();
                    },
                    prev:function(){
                        if(this.nowIndex == 0){
                            // 特殊的地方;
                            this.nowIndex = this.item_num - 2;
                            this.list.css({
                                left : -1519 * (this.item_num - 1) 
                            })
                        }else{
                            this.nowIndex --;
                        }
                        // console.log(this.nowIndex);
                        this.animate();
                    },
                    // toIndex:function(event){
                    //     // 当前发生事件的按钮是谁;
                    //     // 当前发生事件的按钮的下标;
                    //     // index() 方法; => 查找元素下标的方法;
                    //     var target = event.target ;
                    //     // console.log(target);
                    //     this.nowIndex = $(target).index();
                    //     // console.log(this.nowIndex);
                    //     this.animate();
                    // },
                    autoPlay:function(){
                        $("#wrap").mouseenter(function(){
                            clearInterval(this.bannerTimer)
                        }.bind(this))
        
                        $("#wrap").mouseleave(function(){
                            this.bannerTimer = setInterval(function(){
                                this.next();
                            }.bind(this) ,  2000)
                        }.bind(this)).trigger("mouseleave");
                        // trigger 模拟事件触发;
                    },
                    animate:function(){
                        this.list.stop().animate({
                            left : -this.nowIndex * 1519
                        })
                        // this.list_btn.removeClass("active");
                        
                        // var index
                        // if(this.nowIndex == this.item_num - 1){
                        //    index = 0;
                        // }else{
                        //     index = this.nowIndex;
                        // }
                        // this.list_btn.eq(index).addClass("active"); 
                    }
                })
                var banner = new Banner();
                banner.init({
                                item_list : "#list li",
                                // 非必填;
                                left_btn : "#left",
                                right_btn : "#right",
                                // list_btn : "#btn_list button",
                                autoPlay : true
                            });
    // banner二级菜单   
    $(".list li").mouseover(function(e){
        $(this).css({
            backgroundColor:"#000",
            color:"#fff",       
        })
        $(this).children(".ban-menu-hover").css({
            display:"block"
        }).stop(true,true).delay(300).show().animate({width:440 }, 300);
    })
    $(".list li").mouseleave(function(e){
        $(this).css({
            backgroundColor:"#fff",
            color:"#000",       
        })
        $(this).children(".ban-menu-hover").css({
            display:"none"
        }).stop(true,true).hide().animate({width:0}); 
    })
    // 达人搭配
    $(".my-take-ul li").mouseover(function(e){
        var nowIndex = $(this).index();
        // console.log(nowIndex)
        var indexNum = nowIndex + 1;
        var arrow = $(this).width() + 26 ;
        $(".works").hide();
        $(".works" + indexNum).show();
        var arrowmun=nowIndex * arrow;
        $(".my-take-arrow").stop(true,true).animate({left:arrowmun},500);
    })
    // 热门品牌

       
})


