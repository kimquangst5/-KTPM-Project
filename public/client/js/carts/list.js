const add_order = () => {
    const btn_add_order = document.querySelector('[btn-add-order]');
    if (!btn_add_order) return;
    const fullname = document.querySelector("[name = 'fullname']")
    const email = document.querySelector("[name = 'email']")
    const phone = document.querySelector("[name = 'phone']")
    const address = document.querySelector("[name = 'address']")
    const city = document.querySelector("[name = 'city']")
    const country = document.querySelector("[name = 'country']")
    btn_add_order.addEventListener('click', () => {
        axios.post(btn_add_order.getAttribute('btn-add-order'), {
                infor_user: {
                    fullname: fullname.value,
                    email: email.value,
                    phone: phone.value,
                    address: address.value,
                    city: city.value,
                    country: country.value,
                }
            })
            .then(res => {
                if (res.data.success) {
                    quick_alert('success', res.data.message)
                    setTimeout(() => {
                        location.href = `/don-hang/${res.data.order_id}`
                    }, 5000);
                }
                else{
                    quick_alert('warning', res.data.message.join(', '))
                }
            })
    })
}

add_order()