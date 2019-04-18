var slideIndex = 1;
var counter = 0;


var input = document.querySelector('#prod_quantity');


showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var carousal = document.getElementById("next");
setInterval(() => {
    carousal.click();
}, 5000);













// Cart functonality


function buy(id) {
    counter = parseInt(counter) + 1;
    updateCart(counter);
    var url = `http://localhost:3000/addtocart/${id}`;
    fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then(function (response) {
            // Your code for handling the data you get from the API
            console.log(response);
        })
        .catch(function (error) {
            // This is where you run code if the server returns any errors
        });


}




function addCount() {
    input.value = parseInt(input.value) + 1;
    counter = input.value;
    updateCart(counter);

}

function minusCount() {
    input.value = parseInt(input.value) - 1;
   
    updateCart(counter);

    if(input.value >= 0){
        counter = input.value;
    }else if (input.value < 0){
        input.value = 0;
    }

}



function updateCart(counter) {
    //console.log(counter);
    document.getElementsByClassName("cart-count")[0].innerHTML = counter;
    document.getElementsByClassName("cart-count")[1].innerHTML = counter;
}



