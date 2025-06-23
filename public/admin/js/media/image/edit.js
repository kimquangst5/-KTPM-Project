const main = () => {
    const btn_submit = document.querySelector("[btn-submit]");
    if(!btn_submit) return;
    btn_submit.addEventListener('click', () => {
        const public_id = document.querySelector("[name = 'public_id']");
        axios.patch(btn_submit.getAttribute("btn-submit"), {
            public_id: public_id.value
        })
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    location.href = res.data.redirect
                }
                else{
                    quick_alert('warning', res.data.message.join('\n'))
                }
            })
    })
}

main()