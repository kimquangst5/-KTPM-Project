const restore = () => {
    const list_btn = document.querySelectorAll("sl-button[action]");
    if (!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            confirm_alert("Khôi phục sản phẩm!", "Bạn có chắc muốn khôi phục sản phẩm này?", () => {
                axios.patch(btn.getAttribute('action'))
                    .then(res => {
                        if (res.data.success) {
                            location.reload();
                        }
                    })
            })
        })
    });
}

const hard_delete = () => {
    const list_btn = document.querySelectorAll("sl-button[delete]");
    if (!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            confirm_alert("Xóa sản phẩm!", "Bạn có chắc muốn xóa sản phẩm này?. Hành động này không thể khôi phục!", () => {
                axios.delete(btn.getAttribute('delete'))
                    .then(res => {
                        if (res.data.success) {
                            location.reload();
                        }
                    })
            })

        })
    });
}

hard_delete()

restore()