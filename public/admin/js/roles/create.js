const main = () => {
    const form = document.querySelector('form[new-role]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        axios.post(form.getAttribute("action"), {
                name: form.querySelector("[name = 'name' ]").value,
                description: form.querySelector("[name = 'description' ]").value,
            })
            .then(res => {
                if (res.data.success) {
                    form.querySelector("[name = 'name' ]").value = '';
                    form.querySelector("[name = 'description' ]").value = '';
                    alert('Thêm thành công!')
                }
            })
    })

}

main();