const weatherAPIKey = "f0b55e4ff46f555d8522fe451bd5304e";
const weatherAPIURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric";

const galleryImagens = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail 1"
    },

    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail 2"
    },

    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail 3"
    }
    
]

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },

    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },

    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },

    {        
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },

    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },

    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
]

// ATUALIZAR O LOCAL TIME E SAUDAÇÔES A CADA UM SEGUNDO :(
function timeLocation() {
    setInterval(() => {
        let data = new Date()
        
        // saudações
        let greetingText;
        
        if(data.getHours() < 12) {
            greetingText = "Good morning!"
        } else if(data.getHours() < 19) {
            greetingText = "Good afternoon!"
        } else if(data.getHours() < 24) {
            greetingText = "Good evening!"
        } else {
            greetingText = "Welcome!"
        }
        
        document.querySelector("#greeting").innerHTML = greetingText
        
        // TIME LOCAL
        document.querySelector(".time-hours").innerHTML = `${data.getHours().toString().padStart(2, "0")}`;
        document.querySelector(".time-minute").innerHTML = `${data.getMinutes().toString().padStart(2, "0")}`;
        document.querySelector(".time-seconds").innerHTML = `${data.getSeconds().toString().padStart(2, "0")}`;
    },1000)
}

let celsiusToFahr = temperature => (temperature * 9/5) + 5;

function weatherHandler() {    
    navigator.geolocation.getCurrentPosition(position => {          
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;  
        // URL API
        let urlAPI = weatherAPIURL
        .replace("{lat}", latitude)
        .replace("{lon}", longitude)
        .replace("{API key}", weatherAPIKey);
    
        
    
        // Fazendo requisições HTTP
        fetch(urlAPI)
        .then(response =>  response.json())
        .then(data => {
            const condition = data.weather[0].description;
            const location = data.name;
            const temperature = data.main.temp;
    
            let celsiustext = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
            let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;
        
            document.querySelector("p#weather").innerHTML = celsiustext;
    
            document.querySelector(".weather-group").addEventListener("click", (e) => {
                if(e.target.id === "celsius") {
                    document.querySelector("p#weather").innerHTML = celsiustext;
                } else if (e.target.id === "fahr") {
                    document.querySelector("p#weather").innerHTML = fahrText;
                }
            }) 
        }).catch((err => {
            document.querySelector("p#weather").innerHTML = "Unable to get the weather infor. Try again later.";
        }));
    });
};

// Menu
function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", () => {
        document.querySelector("header nav .wrapper").classList.add("nav-open")
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click", () => {
    document.querySelector("header nav .wrapper").classList.remove("nav-open")
});
};

// Seção da galeria

function galeria() {    
    let mainImage = document.querySelector("#gallery > img")
    let thumbnails = document.querySelector("#gallery > .thumbnails")
    
    mainImage.src = galleryImagens[0].src
    mainImage.alt = galleryImagens[0].alt
    
    galleryImagens.forEach(function(image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;
    
        thumb.addEventListener("click", (e) => {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImagens[selectedIndex]
            
            mainImage.src = selectedImage.src
            mainImage.alt = selectedImage.alt     
            
            thumbnails.querySelectorAll("img").forEach((img) => {
                img.dataset.selected = false
            })
    
            e.target.dataset.selected = true;
        })
        thumbnails.appendChild(thumb)
    })
}


// PRODUCTS SECTION

function populateProducts(productList){
    let productsSection = document.querySelector(".products-area")
    productsSection.textContent = "";

    // corre um loop para produtos e criar um elemento html para cada um deles
    productList.forEach(function(product, index) {

        // Criando o elemento html para cada um deles
        let productELement = document.createElement("div");
        productELement.classList.add("product-item");

        // Criando a imagens do produto
        let productImage = document.createElement("img");
        productImage.src = product.image        
        productImage.alt = `Image for ${product.title}`
        
        // Criando a seção de detalhes do produto
        let productDetails = document.createElement("div")
        productDetails.classList.add("product-details")

        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let productPriceTitle = document.createElement("p");
        productPriceTitle.classList.add("price-title");
        productPriceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? `$${product.price.toFixed(2)}`: "Free";
        
        // adicionar o filho do detalhes
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(productPriceTitle);
        productDetails.append(productPrice);

        // adicionar o filho do produto
        productELement.append(productImage);
        productELement.append(productDetails);

        // Adicionar o produto individual a seção de produtos
        productsSection.append(productELement)
    });    
   
};

function productsHandler() {

    // filter para produtos pagos
    paidsProducts = products.filter(item => item.price > 0);

    // filter para produtos free
    freeProducts = products.filter(item => !item.price || item.price <= 0);

    populateProducts(products)  

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidsProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", (e) => {
        if(e.target.id === "all") {
            populateProducts(products)
        } else if(e.target.id === "paid") {
            populateProducts(paidsProducts);
        } else if(e.target.id === "free") {
            populateProducts(freeProducts)
        }
    })

}

function footerHandler() {
    let dateYear = new Date().getFullYear()
    document.querySelector("footer").innerHTML = `&#9400; ${dateYear} - All rights reserved`;
}

// PAGE LOAD FUNCTION :(
timeLocation()
weatherHandler()
galeria()
menuHandler()
productsHandler()
footerHandler()