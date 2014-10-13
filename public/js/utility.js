/**
* Created with dev.
* User: howardc93
* Date: 2014-10-06
* Time: 11:38 AM
* To change this template use Tools | Templates.
*/
function format(input){
    input = parseInt(input)
    return ~~(input<1000 ? input : numeral(input).format('0.0a'))
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function formatSeconds(input) {
    var absTime = Math.abs(input)
    var minutes = ~~ (absTime / 60)
    var seconds = pad(absTime % 60, 2)
    var time = ((input < 0) ? "-" : "")
    time += minutes + ":" + seconds
    return time
}

function momentTime(input) {
    return moment().startOf('day').seconds(input)
}
$( document ).ready(function() {
    $('table.summable').each(function(i, table){
        //iterate through rows
        var sums = {Radiant:{}, Dire:{}}
        var tbody = $(table).find('tbody')
        tbody.children().each(function(i, row){
            row = $(row)
            var target = (row.hasClass('success')) ? sums.Radiant : sums.Dire
            //iterate through cells
            row.children().each(function(j, cell){
                cell = $(cell)
                if (!target[j]){
                    target[j]=0
                }
                var content = cell
                .clone()    //clone the element
                .children() //select all the children
                .remove()   //remove all the children
                .end()  //again go back to selected element
                .text();
                target[j]+=Number(content) || 0

            })
        })
        console.log(sums)
        //add sums to table
        var tfoot = $("<tfoot>")
        for (var key in sums){
            var tr = $("<tr>")
            var sum=sums[key]
            sum["0"]=key
            for (var index in sum){
                var td = $("<td>")
                if (sum[index]!=0){
                    td.text(sum[index])
                }
                tr.append(td)
            }
            tfoot.append(tr)
        }
        $(table).append(tfoot)

    })
    $('.format').each(function(){
        $(this).text(format($(this).text()))
    })
    $('.format-seconds').each(function(){
        $(this).text(formatSeconds($(this).text()))
    })
})