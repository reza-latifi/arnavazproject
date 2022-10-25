if(!localStorage.lastSuggested){
    localStorage.lastSuggested = 0;
}
requestNextSentence(localStorage.lastSuggested);

function suggest(eloquent){
    let id = $('#sentence').attr('data-sentenceid');
    arnvz.suggest(id, eloquent, handleSuggestResponse);
}

function handleSuggestResponse(response){
    if (response.detail == 'Done'){
        showAck();
        localStorage.lastSuggested = response.id;
        requestNextSentence(response.id);
        $('#ineloquent').html('<i class="fa fa-spinner spinning" style="font-size: x-large;"></i>');
    }
    else{
        showMessage('اوه!', 'نوشته‌تان فرستاده نشد. دوباره تلاش کنید.');
    }
}

function showAck(){
    words = ['سپاس!'];
    selected = words[Math.floor(Math.random() * words.length)]
    showMessage(selected, 'این نوشته را هم پالایش کنید');
}


function requestNextSentence(id){
    if(id >= localStorage.lastSuggested){
        arnvz.nextForSuggest(id, showNextSentence);
    }
}

function showNextSentence(sentence){
    if (sentence.id){
        $('#ineloquent').html("«"+sentence.ineloquent+"»");
        $('#sentence').attr('data-sentenceid', sentence.id);
    }
    else{
        showMessage('هورا!', 'نوشته‌ای برای بررسی نمانده');
        $('#sentence').html("");
        $('#suggest').css('display', 'none');
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