const main = () => {
    const form = document.querySelector("form");
    if (!form) return;
    const username = document.querySelector("[name = 'username' ]");
    const email = document.querySelector("[name = 'email' ]");
    const password = document.querySelector("[name = 'password' ]");
    const confirm_password = document.querySelector("[name = 'confirm_password' ]");
    const fullname = document.querySelector("[name = 'fullname' ]");
    const phone = document.querySelector("[name = 'phone' ]");
    const address = document.querySelector("[name = 'address' ]");
    const city = document.querySelector("[name = 'city' ]");
    const country = document.querySelector("[name = 'country' ]");
    if (!username || !email || !password || !confirm_password || !fullname || !phone) return;
    const btn_submit = form.querySelector("[type='submit']");
    if (!btn_submit) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
    });
    btn_submit.addEventListener("click", () => {
        const form_data = new FormData();
        form_data.append("username", username.value);
        form_data.append("email", email.value);
        form_data.append("password", password.value);
        form_data.append("confirm_password", confirm_password.value);
        form_data.append("fullname", fullname.value);
        form_data.append("phone", phone.value);
        form_data.append("address", address ? address.value : "");
        form_data.append("city", city ? city.value : "");
        form_data.append("country", country ? country.value : "");
        // if (password.value !== confirm_password.value) {
        //     quick_alert("warning", "Mật khẩu không khớp!");
        //     return;
        // }
        
        axios.post(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    // quick_alert(res.data.icon, res.data.message);
                    window.location.href = res.data.redirect_url || "/";
                } else quick_alert(res.data.icon, res.data.message.join('\n'));
            })
            .catch(error => {
                console.error("Error during registration:", error);
                quick_alert("error", "An error occurred. Please try again later.");
            });
    });

}

main();