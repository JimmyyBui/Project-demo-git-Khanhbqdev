    let container =  document.querySelector('.cart-container');
    let cartContainer = document.querySelector('.cart-items');


    // lấy giỏ hàng từ LocoStorage
    let cart =  JSON.parse(localStorage.getItem('cart')) || {};
    console.log(`đã láy về thành công: ${cart}`)

    // hàm render các mục trong giỏ hàng 
    
    const renderCartItem = async () => {
        try {
            const response = await fetch('../../data.json'); // Fetch dữ liệu từ file JSON
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Bắt lỗi nếu HTTP không thành công
            }
    
            const data = await response.json(); // Chuyển dữ liệu thành JSON
            console.log('Lấy dữ liệu thành công:', data); // Kiểm tra dữ liệu đã lấy
            
            if (cart.length !== 0) {
                // Nếu có sản phẩm trong giỏ hàng
                cartContainer.innerHTML = cart.map(itemCart => {
                    // Tìm sản phẩm trong dữ liệu từ file JSON
                    let search = data.find(itemData => itemData.id === itemCart.id);
                    
                    if (search) {
                        return `
                            <div class="cart-item">
                                <div class="cart-image">
                                    <img src="${search.image}" alt="${search.name}">
                                </div>
                                <div class="cart-info">
                                    <h3>${search.name}</h3>
                                    <p>Giá: <span class="price">${search.currency}${search.price}</span></p>
                                    <div class="cart-quantity">
                                        <label for="quantity">Số lượng:</label>
                                        <input type="number" id="quantity_${search.id}" value="${itemCart.count}" min="1">
                                    </div>
                                    <p>Tổng giá: <span class="item-total-price">${search.currency}${search.price * itemCart.count}</span></p>
                                </div>
                                <div class="cart-actions">
                                    <button class="btn_edit"><i class="fa fa-pencil"></i> Chỉnh sửa</button>
                                    <button class="btn_remove"><i class="fa fa-trash"></i> Xóa</button>
                                </div>
                            </div>
                        `;
                    }
                }).join("");
            } else {
                // Nếu giỏ hàng trống
              return container.innerHTML = `
                    <div class="empty_cart">
                        <img src="https://via.placeholder.com/200x200" alt="Empty Cart">
                        <h2>Giỏ hàng của bạn đang trống</h2>
                        <p>Vui lòng thêm sản phẩm vào giỏ hàng</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    };


    // Ham Update so luong
    let update = (id) => {
            if (cart.length !== 0) {
                let searchIndex = cart.findIndex(itemCart => itemCart.id === id);
                if (searchIndex !== -1) {
                    let quantityElement = document.getElementById(`quantity_${id}`);
    
                    if (quantityElement) {
                        cart[searchIndex].count = parseInt(quantityElement.value, 10) || 0;
    
                        localStorage.setItem('cart', JSON.stringify(cart));
    
                        renderCartItem(); // Gọi hàm renderCartItem sau khi cập nhật
                    }
                }
            }
        };
    
     renderCartItem();