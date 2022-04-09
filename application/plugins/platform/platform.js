$.get('https://api.github.com/repos/proSamael/Project_MVC/commits', function (data) {

    let latest = '#'+data[0].sha.substring(0,7);
    $('#latest_version').text(latest);

    data.forEach(function(item, i, arr) {

        string = item.commit.message;
        str = string.split(/[\n]/);
        let str_out = '';
        $.each(str, function(i) {

            str_out += str[i] + "<br>";

        })
        var str = '012123';

        var as='<div class="time-label">\n' +
            '<span class="bg-gradient-green">' +
            moment(item.commit.author.date).utc().format('HH:MM DD.MM.YYYY') +
            '</span>\n' +
            '</div>' +
            '<div>\n' +
            '                <i class="fas fa-comments bg-yellow"></i>\n' +
            '                    <div class="timeline-item">\n' +
            '                    <span class="time"><i class="fas fa-clock"></i> ' +
            moment(item.commit.author.date).fromNow() +
            '</span>\n' +
            '                <h3 class="timeline-header">' +
            '<a href="#">  ' +
            item.author['login'] +
            '</a> add new commit ' +
            '<a href="' +
            item.commit.url +
            '">#' +
            item.sha.substring(0,7) +
            '</a>\n' +

            '</h3>\n' +
            '                <div class="timeline-body">\n' +
            str_out
            +
            '                </div>\n' +
            '                <div class="timeline-footer">\n' +
            '                    <a class="btn btn-warning btn-sm" href="' +
            item.commit.url +
            '">View commint</a>\n' +
            '                </div>\n' +
            '                </div>\n' +
            '                </div>';
        $('#timeline').append(as);

        /*
                <div class="time-label">
                    <span class="bg-red">10 Feb. 2014</span>
                </div>
                <!-- /.timeline-label -->


                <!-- timeline item -->
                <div>
                <i class="fas fa-comments bg-yellow"></i>
                    <div class="timeline-item">
                    <span class="time"><i class="fas fa-clock"></i> 27 mins ago</span>
                <h3 class="timeline-header"><a href="#">Jay White</a> commented on your post</h3>
                <div class="timeline-body">
                    Take me to your leader!
                    Switzerland is small and neutral!
                    We are more like Germany, ambitious and misunderstood!
                </div>
                <div class="timeline-footer">
                    <a class="btn btn-warning btn-sm">View comment</a>
                </div>
                </div>
                </div>
                <!-- END timeline item -->
                */


        console.log(item)

    });

    var end = '<div>\n' +
        '<i class="fas fa-clock bg-gray"></i>\n' +
        '</div>'
    $('#timeline').append(end);

});




