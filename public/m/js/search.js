$(function () {

    addHistory();
    queryHistory();
    deleteHistory();
    closeHistory();
})



//添加历史记录
function addHistory() {
    $('.search-bnt').on('click', function () {
        var search = $('.search-input').val();
        console.log(search);

        var historyData = localStorage.getItem('history');

        if (historyData) {
            historyData = JSON.parse(historyData);
        } else {
            historyData = [];
        }

        if (historyData.indexOf(search) == -1) {

            historyData.push(search);
            localStorage.setItem('history', JSON.stringify(historyData));
        }
        queryHistory();
    })
}

//查询历史数据

function queryHistory() {
    var historyData = localStorage.getItem('history');

    if (historyData) {
        historyData = JSON.parse(historyData);
    } else {
        historyData = [];
    }
    historyData = historyData.reverse();
    var html = template('getHistoryTmp', { rows: historyData });
    $('.search-history-list .mui-table-view').html(html);
    $('.search-input').val('');
}

//删除历史
function deleteHistory() {
    $('.mui-table-view').on('click', '.close-history', function () {
        // console.log(123);
        var index = $(this).data('index');
        // console.log(index);
        var historyData = localStorage.getItem('history');

        if (historyData) {
            historyData = JSON.parse(historyData);
        } else {
            historyData = [];
        }
        historyData = historyData.reverse();
        historyData.splice(index,1);
        historyData = historyData.reverse();
        localStorage.setItem('history',JSON.stringify(historyData));
        queryHistory();
    })
}


//情空历史
function closeHistory(){
    $('.close-history').on('click',function(){
        localStorage.setItem('history','');
        queryHistory();
    })
}