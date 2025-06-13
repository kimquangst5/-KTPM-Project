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
        axios.patch(form.getAttribute('action'))
        
    })
}

main()