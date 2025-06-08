const main = () => {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    const account = document.querySelector("[name = 'account' ]");
    const password = document.querySelector("[name = 'password' ]");
    if (!account || !password) return;
    const btn_submit = form.querySelector("[type='submit']");
    if (!btn_submit) return;
    btn_submit.addEventListener("click", () => {
        axios.patch(form.action, {
            account: account.value,
            password: password.value
        }).then((res) => {
            if (res.data.success) {
                if (res.data.success) {
                    // quick_alert(res.data.icon, res.data.message);
                    window.location.href = res.data.redirect_url || "/";
                } else quick_alert(res.data.icon, res.data.message.join('\n'));
                
            } else {
                alert(res.data.message);
            }
        });
    });
}

main();