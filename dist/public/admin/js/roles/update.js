const main = () => {
    const form = document.querySelector('form[update-role]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        axios.patch(form.getAttribute("action"), {
                name: form.querySelector("[name = 'name' ]").value,
                description: form.querySelector("[name = 'description' ]").value,
            })
            .then(res => {
                if (res.data.success) {
                    location.reload();
                }
            })
    })

}

main();