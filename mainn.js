//láy thẻ section bên html
const products = document.querySelector('.products');
// goi data lên  , dùng bất đồng bộ 
const getData = async ()=>{
    // fetch data từ file JSON thư mục chứa file trên server
    const  reponse = await fetch('data.json');

    const  data = await reponse.json();
    // nếu fetch thành công thì lấy dữ liệu và render lên trang
    // nếu data có tồn tại thì láy lên ko thì ngưng xử lí lỗi
    if(data) {
        products.innerHTML = data.map(item => {
            //Render Size sản phẩm 
            const sizesHTML= item.sizes.map(size => `<span>${size}</span>`).join('');
            //Render Color
            const colorsHTML = item.colors.map(color => `<span class="${color.class}"></span>`).join('');
            // trả về Html mỗi sản phẩm 
            return `
            <div class="Cart">
                         <div class="cart_heart">
                             <i class='${item.icons.heart}'></i>
                   </div>
                   <div class="cart_cart">
                         <i class='${item.icons.cart}'></i>
                  </div>
                         <div class="cart_img">
                            <img src="${item.image}" alt="${item.image}">
                  </div>
                  <div class="cart_title">
                            ${item.name}
                  </div>
                 <div class="cart_price">
                         ${item.price}${item.currency}
                </div>
                <div class="cart_size">
                    <h3>Size:</h3>
                    ${sizesHTML}
                
                </div>
                <div class="cart_color">
                    <h3>Color:</h3>
                    ${colorsHTML}  
                </div>
                <div class="cart_action">
                   <a href="/pages/detail/detail.html?id=${item.id}">
                         <button>Buy Now</button>
                   </a>
                    <a>
                <button class="btn_cart">Add to Cart</button>
            </a>
                </div>
            </div> 
            `;
            
        }).join('');
    }

};

getData();

 