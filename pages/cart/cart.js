    // // Lấy các phần tử HTML
    // let container = document.querySelector('.container');
    // let cartContainer = document.querySelector('.cart-items'); // Kiểm tra xem .cart-container có đúng không


    // // Lấy giỏ hàng từ localStorage
    //  let cart = JSON.parse(localStorage.getItem('cart')) || [];
    //  console.log(cart)
    // // Hàm render các mục trong giỏ hàng
    // const renderCartItem = async () => {
    //     try {
    //         const response = await fetch('../../data.json');

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         console.log(data); // Hiển thị dữ liệu lên console

    // //         if (cart.length !== 0) {
    // //             if (cartContainer) {
    // //                 cartContainer.innerHTML = cart.map(itemCart => {
    // //                     let search = data.find(itemData => itemData.id === itemCart.id) || [];

    // //                     return `
                    






    // //                     `;
    // //                 }).join("");
    // //             } else {
    // //                 console.error("Không tìm thấy cartContainer!");
    // //             }
    // //         } else {
    // //             container.innerHTML = `
    // //                 <div class="empty_cart">
    // //                     <img src="https://via.placeholder.com/200x200" alt="Empty Cart">
    // //                     <h2>Giỏ hàng của bạn đang trống</h2>
    // //                     <p>Vui lòng thêm sản phẩm vào giỏ hàng</p>
    // //                 </div>
    // //             `;
    // //         }
    // //     } catch (error) {
    // //         console.error('Có lỗi xảy ra:', error);
    // //     }
    // // };

    // // // // Hàm update số lượng 
    // // // let update = (id) => {
    // // //     if (cart.length !== 0) {
    // // //         let searchIndex = cart.findIndex(itemCart => itemCart.id === id);
    // // //         if (searchIndex !== -1) {
    // // //             let quantityElement = document.getElementById(`quantity_${id}`);

    // // //             if (quantityElement) {
    // // //                 cart[searchIndex].count = parseInt(quantityElement.value, 10) || 0;

    // // //                 localStorage.setItem('cart', JSON.stringify(cart));

    // // //                 renderCartItem(); // Gọi hàm renderCartItem sau khi cập nhật
    // // //             }
    // // //         }
    // // //     }
    // // // };

    // // renderCartItem(); // Gọi hàm renderCartItem để hiển thị giỏ hàng
