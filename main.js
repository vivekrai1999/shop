const productPageUrl = 'https://afzal-test-shop.myshopify.com/products/color_box.js'
let apiData = {}
function fetchApi(url){
    const fetchedData = fetch(url).then(res=>res.json()).then(data=>data)
    return fetchedData
}

const rightContainer = document.querySelector(".right-container")

async function generateVarients(apiData){
    const varients = apiData.variants
    console.log(varients);
    const varientList = varients.map((varient)=>{
        const {title} = varient
        return `<div class="btn ${title.toLowerCase()}">${title}</div>`
    }).join("")
    return varientList
}


function getvarientImages(apiData){
    const mainImage = apiData
    const thumbnails = apiData
}

function varientClick(apiData){
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach((button)=>{
        button.addEventListener("click",()=>{
            getvarientImages(apiData)
        })
    })
}

async function createProduct(){
    const data = await fetchApi(productPageUrl)
    apiData = {...data}
    const varientList = await generateVarients(apiData)
    const {title, vendor, price} = apiData;
    rightContainer.innerHTML = `
    <div class="container vendor">${vendor}</div>
    <div class="container title">${title}</div>
    <div class="container price">${price}</div>
    <div class="container varients">
        <div class="varient-text">Varients</div>
        <div class="varient-buttons">
            ${varientList}
        </div>
    </div>
    <div class="container quantity">
        <div class="quantity-text">Quantity</div>
        <div class="quantity-button">
        <div class="remove">-</div>
        <div class="count">0</div>
        <div class="add">+</div>
    </div>
    </div>
    <div class="container buy-buttons">
        <div class="add-to-cart">Add to cart</div>
        <div class="buy-now">Buy Now</div>
    </div>
    `
    varientClick(apiData)
}
createProduct()