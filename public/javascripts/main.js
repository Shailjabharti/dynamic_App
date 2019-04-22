var slideIndex = 1;
//var counter = 0;





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


function buy(id, operation, endpoint) {
    //counter = parseInt(counter) + 1;
    //updateCart(counter);
    var url = `http://localhost:3000/${endpoint}/${id}/${operation}`;

    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, true);
    xmlHttpReq.onload = function () {
        if (xmlHttpReq.status >= 200 && xmlHttpReq.status < 400) {
            let data = JSON.parse(xmlHttpReq.responseText);
            updateCart(data.counter);
        } else {
            console.log("We conected to the server, but it returned an error.");
        }
    }
    xmlHttpReq.onerror = function () {
        console.log("Connection Error");
    }
    xmlHttpReq.send();

}

function addCount(id, prodid, price) {
    var input = document.getElementById("prod" + prodid);
    input.value = parseInt(input.value) + 1;
    counter = input.value;
    buy(id, 'add', 'addtocart');
    updateTotalCart(prodid, price);
    //updateCheckoutAmount();

}

function minusCount(id, prodid, price) {
    var input = document.getElementById("prod" + prodid);
    input.value = parseInt(input.value) - 1;
    console.log(input.value);
    if (input.value > 0) {
        counter = input.value;
        buy(id, 'remove', 'addtocart');
    } else if (input.value <= 0) {
        input.value = 0;
        buy(id, 'remove', 'remove-item');
    }
    updateTotalCart(prodid, price);
    //updateCheckoutAmount();
}

function updateCart(counter) {
    document.getElementsByClassName("cart-count")[0].innerHTML = counter;
    if (window.location.pathname == "/product") {
        window.location.href = "/cart";
    }
    updateCheckoutAmount();
}

function updateTotalCart(prodid, price) {
    var input = document.getElementById("prod" + prodid);
    var totalPrice = parseInt(price) * parseInt(input.value);
    document.getElementsByClassName("totalp" + prodid)[0].innerHTML = totalPrice;
}

function updateCheckoutAmount() {
    var checkoutAccumulation = document.getElementsByClassName("total");
    console.log(checkoutAccumulation);

    let totalCheckoutSpan = document.getElementById("totalCheckoutAmount");
    let totalCheckoutPrice = 0;
    for (let i = 0; i < checkoutAccumulation.length; i++) {
        console.log(checkoutAccumulation[i].innerHTML);
        totalCheckoutPrice = totalCheckoutPrice + parseInt(checkoutAccumulation[i].innerHTML);
    }
    console.log(totalCheckoutPrice);

    totalCheckoutSpan.innerHTML = "Rs. " + totalCheckoutPrice;
    console.log("hiiiiiiiiiiii",totalCheckoutPrice);
 
}


