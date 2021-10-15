const keyInput = document.querySelector('#key')
const foodlist = document.querySelector('.food-list')


keyInput.addEventListener('keyup',(e)=>{


    let key = e.target.value.toLowerCase()




    if(key !== ''){


        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`;

        searchMeal()

        async function searchMeal(){

            const response = await fetch(url)
            const responseData = await response.json();

            // console.log(responseData)

            if(responseData.meals !== null){

                console.log(responseData.meals)

                foodlist.innerHTML = ''
                let food = ''

                responseData.meals.forEach(meal => {
                    food += `<div class="food">
                                <div class="thumbnail">
                                    <img src="${meal.strMealThumb}" alt="">
                                </div>
                                <h2>${meal.strMeal}</h2>
                            </div>`
                });
                foodlist.innerHTML = food

            }else{
                key = ''
            }

        }

        

    }
    else{
        foodlist.innerHTML = ''
    }


})

// 