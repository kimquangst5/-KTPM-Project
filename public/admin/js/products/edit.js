const main = () => {
    const form = document.querySelector('form[update-products]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        const form_data = new FormData();
        form_data.append('name', form.querySelector("[name = 'name' ]").value);
        form_data.append('description', form.querySelector("[name = 'description' ]").value);
        form_data.append('price', form.querySelector("[name = 'price' ]").value);
        form_data.append('discount', form.querySelector("[name = 'discount' ]").value);
        form_data.append('product_categories', form.querySelector("[name = 'product_categories' ]").value);
        form_data.append('quantity', form.querySelector("[name = 'quantity' ]").value);
        
        axios.patch(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    location.reload()
                }
            })
    })

}

main();