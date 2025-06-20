const soft_delete = () => {
    const list_btn = document.querySelectorAll("sl-button[soft-delete]");
    if (!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            confirm_alert("Xóa tài khoản quản trị!", "Bạn có chắc muốn xóa tài khoản này?", () => {
                axios.patch(btn.getAttribute('soft-delete'))
                    .then(res => {
                        if (res.data.success) {
                            location.reload();
                        }
                    })
            })

        })
    });
}

soft_delete()