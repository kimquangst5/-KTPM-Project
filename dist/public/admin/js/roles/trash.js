const restore = () => {
    const list_btn = document.querySelectorAll("sl-button[action]");
    if(!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            confirm_alert("Khôi phục nhóm quyền!", "Bạn có chắc muốn khôi phục nhóm quyền này?", () => {
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
            confirm_alert("Xóa nhóm quyền!", "Bạn có chắc muốn xóa nhóm quyền này?. Hành động này không thể khôi phục!", () => {
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