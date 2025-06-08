const main = () => {
    const form = document.querySelector('form[new-categories]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        const form_data = new FormData();
        form_data.append('name', form.querySelector("[name = 'name' ]").value);
        form_data.append('description', form.querySelector("[name = 'description' ]").value);
        form_data.append('parent_id', form.querySelector("[name = 'parent_id' ]").value);
        form_data.append('avatar', form.querySelector("[name = 'avatar' ]").files[0]);

        axios.post(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    form.querySelector("[name = 'name' ]").value = '';
                    form.querySelector("[name = 'description' ]").value = '';
                    form.querySelector("[name = 'parent_id' ]").value = '';
                    alert('Thêm thành công!')
                }
            })
    })

}

main();