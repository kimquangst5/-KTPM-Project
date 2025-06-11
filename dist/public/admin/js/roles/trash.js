const restore = () => {
    const list_btn = document.querySelectorAll("sl-button[action]");
    if(!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            axios.patch(btn.getAttribute('action'))
                .then(res => {
                    if(res.data.success){
                        location.reload();
                    }
                })
        })
    });
}

const hard_delete = () => {
    const list_btn = document.querySelectorAll("sl-button[delete]");
    if (!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            axios.delete(btn.getAttribute('delete'))
                .then(res => {
                    if (res.data.success) {
                        location.reload();
                    }
                })
        })
    });
}

hard_delete()

restore()