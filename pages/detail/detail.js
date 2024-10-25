const detailContainer = document.querySelector('.product_detail');
const cartIcon = document.querySelector('.cart'); // Thêm phần này nếu chưa có

const getDetailProduct = async () => {
    try {
        const path = new URLSearchParams(window.location.search);
        const productId = path.get('id');

        // Fetch dữ liệu từ file JSON
        const response = await fetch('../../data.json');
        
        // Kiểm tra xem yêu cầu có thành công hay không
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Tìm sản phẩm dựa trên ID
        const findProduct = data.find(item => item.id.toString() === productId.toString());

        // Kiểm tra xem sản phẩm có được tìm thấy hay không
        if (!findProduct) {
            throw new Error('Product not found');
        }

        // Hiển thị thông tin sản phẩm
        detailContainer.innerHTML = `
            <div class="product_image">
                <img src="${findProduct.image}" alt="${findProduct.name}">
            </div>
            <div class="product_info">
                <h1 class="product_name">${findProduct.name}</h1>
                <p class="product_price">${findProduct.price}${findProduct.currency}</p>
                <p class="product_description">
                    This is a comfortable and stylish t-shirt, perfect for casual outings. Made with high-quality fabric to ensure durability and comfort.
                </p>
                <div class="product_options">
                    <div class="product_sizes">
                        <h3>Size:</h3>
                        ${findProduct.sizes.map(size => `<span>${size}</span>`).join(' ')}
                    </div>
                    <div class="product_colors">
                        <h3>Color:</h3>
                        ${findProduct.colors.map(color => `<span class="${color.class} color_box"></span>`).join('')}
                    </div>
                </div>
                <div class="product_actions">
                    <button class="btn_buy">Buy Now</button>
                    <button class="btn_cart">Add to Cart</button>
                </div>
            </div>
        `;

        // Đăng ký sự kiện cho nút "Add to Cart" sau khi nội dung đã được thêm
        document.querySelector('.btn_cart').addEventListener('click', () => {
            // Lấy giỏ hàng từ localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Tìm sản phẩm trong giỏ hàng
            const itemIndex = cart.findIndex(item => item.id === findProduct.id);

            if (itemIndex !== -1) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                cart[itemIndex].count += 1;
            } else {
                // Nếu sản phẩm chưa có, thêm vào giỏ hàng
                cart.push({ id: findProduct.id, count: 1 });
            }

            // Lưu lại giỏ hàng vào localStorage
            try {
                localStorage.setItem('cart', JSON.stringify(cart));
            } catch (error) {
                console.error('Error saving cart to localStorage:', error);
            }

            // Cập nhật biểu tượng giỏ hàng
            updateCartIcon();
        });

        // Cập nhật biểu tượng giỏ hàng khi tải trang
        updateCartIcon(); // Gọi hàm này để cập nhật số lượng giỏ hàng ngay khi tải trang

    } catch (error) {
        console.error('Có lỗi xảy ra:', error.message); // Xử lý lỗi và hiển thị ra console
        detailContainer.innerHTML = `<p>Error: ${error.message}</p>`; // Hiển thị thông báo lỗi cho người dùng
    }
};

// Hàm cập nhật biểu tượng giỏ hàng
const updateCartIcon = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if(cart && cart.length > 0){
        cartIcon.innerHTML = `
            <span class="cart_count">${cart.reduce((total, item) => total + item.count, 0)}</span>
            <i class="fa fa-shopping-cart"></i>
        `;
    } else {
        cartIcon.innerHTML = '<i class="fa fa-shopping-cart"></i>'; // Nếu giỏ hàng trống
    }
};

// Gọi hàm lấy chi tiết sản phẩm
getDetailProduct();
