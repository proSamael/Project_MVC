$.get('https://api.github.com/repos/proSamael/Project_MVC/commits', function (data) {
    console.log(data)
    let latest = '#'+data[0].sha.substring(0,7);
    $('#latest_version').text(latest);
});




