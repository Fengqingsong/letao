$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    getCategoryLeft();
    clickLeft();
    getRightData(1);
});





function getCategoryLeft(){
    $.ajax({
        url:'http://localhost:3000/category/queryTopCategory',
        success:function(data){
            // console.log(data);
            var html = template('categoryLeftTmp',data);
            // console.log(html);
            $('.category-left ul').html(html);
            $('.category-left ul li').eq(0).addClass('active');

        }
    })
}


function clickLeft(){
    $('.category-left ul').on('click',function(e){
            // console.log(e.target);
            var id = $(e.target).data('id');
            // console.log(id);
            $(e.target).parent().addClass('active').siblings().removeClass('active');
            getRightData(id);
    })
}

function getRightData(id){
    $.ajax({
        url: 'http://localhost:3000/category/querySecondCategory',
        data:{id:id},
        success:function(data){
            // console.log(data);
            var html = template('categoryRightTmp',data);
            // console.log(html);
            if(data.rows.length){
                $('.category-right .mui-scroll').html(html);  
            } else {
                $('.category-right .mui-scroll').html('<span>没有数据</span>');
            }
           
        }
    })
}