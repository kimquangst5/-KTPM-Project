const main = () => {
    const form = document.querySelector('form[new-account]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        const form_data = new FormData();
        form_data.append('username', form.querySelector("[name = 'username' ]").value);
        form_data.append('password', form.querySelector("[name = 'password' ]").value);
        form_data.append('confim_password', form.querySelector("[name = 'confim-password' ]").value);
        form_data.append('avatar', form.querySelector("[name = 'avatar' ]").files[0]);
        form_data.append('fullname', form.querySelector("[name = 'fullname' ]").value);
        form_data.append('birthday', form.querySelector("[name = 'birthday' ]").value);
        form_data.append('role_id', form.querySelector("[name = 'role_id' ]").value);
        form_data.append('email', form.querySelector("[name = 'email' ]").value);

        
        axios.post(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    form.querySelector("[name = 'username' ]").value = '';
                    form.querySelector("[name = 'password' ]").value = '';
                    alert('Thêm thành công!')
                }
                else{
                    quick_alert('warning', res.data.message.join('\n'))
                }
            })
    })
}

main();