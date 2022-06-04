$.get('https://api.github.com/repos/proSamael/Project_MVC/commits', function (data) {




    data.forEach(function(item, i, arr) {

        string = item.commit.message;
        str = string.split('\n');
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


    });

    var end = '<div>\n' +
        '<i class="fas fa-clock bg-gray"></i>\n' +
        '</div>'
    $('#timeline').append(end);
});




