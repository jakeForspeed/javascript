const jokeBtn = document.querySelector('button')
const jokeTxt = document.querySelector('.joke > p')


jokeBtn.addEventListener('click',generateRandomJoke)

async function generateRandomJoke(){
    // const res = await fetch('http://api.icndb.com/jokes/random');
    // const resData = await res.json();
    // const d = resData.value.joke

    $.ajax({
        url:'http://api.icndb.com/jokes/random',
        method:'post',
        // dataType:'json',
        success:function(r){
            console.log(r)

            $('#jtxt').html(r.value.joke);
        }
    })
    



    // jokeTxt.innerHTML = d
}