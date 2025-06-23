const soft_delete = () => {
    const list_btn = document.querySelectorAll("sl-button[hard-delete]");
    if (!list_btn || list_btn.length <= 0) return;
    list_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            confirm_alert("Xóa hình ảnh!", "Bạn có chắc muốn xóa ảnh này? Hành động này không thể khôi phục!", () => {
                axios.delete(btn.getAttribute('hard-delete'), {
                    data: {
                        public_id: btn.getAttribute('id')
                    }
                })
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

const btn_checkbox = () => {
    const check_all = document.querySelector("thead sl-checkbox");
    const check_items = document.querySelectorAll("tbody sl-checkbox");
    
    check_all.addEventListener('sl-change', (e) => {
        check_items.forEach(item => {
            item.checked = check_all.checked
        });
        
    })

    check_items.forEach(item => {
        item.addEventListener("sl-change", (e) => {
            if (item.checked == false) check_all.checked = item.checked;
            else{
                const check_items_checked = document.querySelectorAll("tbody sl-checkbox[checked]");
                console.log(check_items.length);
                if ((check_items.length - 1) == check_items_checked.length) check_all.checked = true

                
            }
        })
    });
    
}

btn_checkbox()

const delete_many = () => {
    const dropdown = document.querySelector('sl-dropdown[list-action]');
    dropdown.addEventListener('sl-select', event => {
        const selectedItem = event.detail.item;
        console.log(selectedItem.value);
        const items_checked = document.querySelectorAll("tbody sl-checkbox[checked]")
        if (items_checked.length == 0) quick_alert("warning", "Vui lòng chọn các hình ảnh để xóa!");
        else{
            confirm_alert("Xóa nhiều ảnh!", `Bạn có chắc muốn xóa ${items_checked.length} ảnh này?`, () => {
                let public_ids = [];
                for (const it of items_checked) {
                    public_ids.push(it.getAttribute("id"));
                }
                axios.delete(`/admin/media/image/${selectedItem.value}`, {
                    data: {
                        public_id: public_ids
                    }
                })
                    .then(res => {
                        if (res.data.success) {
                            location.reload();
                        }
                    })
            })
        }
    });
}

delete_many()