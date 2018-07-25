/**
 * Created by gjj on 2014/8/27.
 */

function loadPeoples(callback){

    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'data.json', true );
    xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            people_team = JSON.parse( xhr.responseText ).peoples;
            console.log(people_team);
            for (var s in people_team) {
                peopledatas[ people_team[s].id] = people_team[s];
            }
            console.log("读取文件存入people_team");
            callback();
        }
    };
    xhr.send(null);
}

