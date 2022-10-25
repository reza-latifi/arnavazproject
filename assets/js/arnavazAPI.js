var arnvz = {
    requestAPI: function(method, callback) {
        grecaptcha.ready(function() {
            grecaptcha.execute('6LdyC5scAAAAAI0tPhWV3DmT9dUUG7-j3posqX7F', {action: method}).then(function(token) {
                let ArnavazAPI = 'https://rezza.pythonanywhere.com/api';    
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", ArnavazAPI+'/'+method+'?token='+token+'&action='+method, false);
                xmlHttp.send();
                callback(JSON.parse(xmlHttp.responseText));
            });
        });
    },

    postAPI: function(method, data, callback) {
        grecaptcha.ready(function() {
            grecaptcha.execute('6LdyC5scAAAAAI0tPhWV3DmT9dUUG7-j3posqX7F', {action: method}).then(function(token) {
                let ArnavazAPI = 'https://rezza.pythonanywhere.com/api';    
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", ArnavazAPI+'/'+method+'?token='+token+'&action='+method, false);
                xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlHttp.send(data);
                callback(JSON.parse(xmlHttp.responseText));
            });
        });
    },

    vote: function(id, vote, callback) {
        this.requestAPI('vote/'+id+'/'+vote+'/', callback);
    },

    suggest: function(id, eloquent, callback) {
        this.postAPI('suggest/'+id+'/submit/', 'eloquent='+eloquent, callback);   
    },

    nextForSuggest: function(id, callback) {
        this.requestAPI('suggest/'+id+'/next/', callback);   
    },

    nextForVote: function(id, callback) {
        this.requestAPI('vote/'+id+'/next/', callback);   
    },
};
