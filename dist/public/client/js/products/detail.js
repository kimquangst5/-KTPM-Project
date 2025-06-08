const add_cart = () => {
    const btn_add_cart = document.querySelector('[btn-add-cart]');
    if (!btn_add_cart) return;
    btn_add_cart.addEventListener('click', () => {
        if (!btn_add_cart.getAttribute('user_id')) {
            quick_alert('warning', 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }
        const quantity = document.querySelector("[name='quantity']").value;
        axios.post(btn_add_cart.getAttribute('action'), {
            product_id: btn_add_cart.getAttribute('btn-add-cart'),
            quantity: parseInt(quantity),
            user_id: btn_add_cart.getAttribute('user_id')
        })
            .then(res => {
                if (res.data.success) {
                    console.log(res.data);
                    
                    quick_alert('success', res.data.message);
                    document.querySelector("[name='quantity']").value = 1;
                    // document.querySelector('.cart-count').innerText = res.data.cart_count;
                } else {
                    quick_alert('error', res.data.message);
                }
            })
    });
}

add_cart();