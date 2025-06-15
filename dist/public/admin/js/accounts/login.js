document.addEventListener('DOMContentLoaded', function () {
    window.setTimeout(document.querySelector('svg').classList.add('animated'), 1000);
})

const main = () => {
    const form = document.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', (e) => e.preventDefault())
    const btn_submit = form.querySelector('sl-button')
    if (!btn_submit) return;
    btn_submit.addEventListener('click', () => {
        const account = document.querySelector("[name = 'account']")
        const password = document.querySelector("[name = 'password']")
        const remember = document.querySelector("[name = 'remember']");
        const url = new URL(location.href)
        
        axios.patch(form.getAttribute('action'), {
            account: account.value,
            password: password.value,
            remember: remember.checked,
            continue: url.searchParams.get('continue')
        })
            .then(res => {
                if(res.data.success){
                    if (res.data.continue) location.href = res.data.continue;
                    else location.href = '/admin/products/index';
                    
                }
                else{
                    quick_alert('warning', res.data.message.join('\n'))
                }
            })

    })
}

main()