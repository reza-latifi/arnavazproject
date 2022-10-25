if(!localStorage.lastVoted){
    localStorage.lastVoted = 0;
}
requestNextSentence(localStorage.lastVoted);

function vote(vote){
    let id = $('#sentence').attr('data-sentenceid');
    arnvz.vote(id, vote, handleVoteResponse);
}

function handleVoteResponse(response){
    if (response.detail == 'Done'){
        showAck();
        localStorage.lastVoted = response.id;
        requestNextSentence(response.id);
        $('#ineloquent').html('<i class="fa fa-spinner spinning" style="font-size: x-large;"></i>');
        $('#eloquent').html('<i class="fa fa-spinner spinning" style="font-size: x-large;"></i>');
    }
    else{
        showMessage('اوه!', 'رایتان فرستاده نشد. دوباره تلاش کنید.');
    }
}

function showAck(){
    words = ['سپاس!'];
    selected = words[Math.floor(Math.random() * words.length)]
    showMessage(selected, 'چگونگی پالایش این نوشته را هم بررسی کنید');
}


function requestNextSentence(id){
    if(id >= localStorage.lastVoted){
        arnvz.nextForVote(id, showNextSentence);
    }
}

function showNextSentence(sentence){
    if (sentence.id){
        $('#ineloquent').html("«"+sentence.ineloquent+"»");
        $('#eloquent').html("«"+sentence.eloquent+"»");
        $('#sentence').attr('data-sentenceid', sentence.id);
    }
    else{
        showMessage('هورا!', 'نوشته‌ای برای بررسی نمانده');
        $('#sentence').html("");
        $('#votedown').css('display', 'none');
        $('#voteup').css('display', 'none');
    }
}

function showMessage(message, desc){
    $('#notice').html(message);
    $('#notice-desc').html(desc);
    $('#notice-container').css('display', 'block');
}

function hideMessage(){
    $('#notice').html('');
    $('#notice-container').css('display', 'none');
}