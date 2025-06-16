var upload;
const init_preview_image = () => {
    upload = new FileUploadWithPreview.FileUploadWithPreview('preview-image', {
        multiple: true,
        accept: 'image/*',
        maxFileCount: 6,
        showDeleteButtonOnImages: true,
    });
}

init_preview_image()

const init_sortable = () => {
    const item = document.querySelector('.image-preview')
    new Sortable(item, {
        animation: 450,
        ghostClass: 'blue-background-class'
    });
    
}

init_sortable()

const main = () => {
    const form = document.querySelector('form[update-products]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', async () => {
        const form_data = new FormData();
        const list_img = document.querySelectorAll('.image-preview-item');
        console.log(list_img);
        let array_data_image = []
        let pos = 1;
        for await (const it of list_img) {
            
            let data = {
                position: pos
            }
            
            if (it.getAttribute('assets_id')) {
                data.assets_id = it.getAttribute('assets_id'),
                data.new = false
            } else {
                data.new = true
                const file = upload.cachedFileArray.find(file => file.name == it.getAttribute('data-upload-name'))
                form_data.append('images', file);
            }
            console.log(data);
            array_data_image.push(data);
            pos++;
        }
        console.log(array_data_image);
        
        form_data.append('name', form.querySelector("[name = 'name' ]").value);
        form_data.append('description', form.querySelector("[name = 'description' ]").value);
        form_data.append('price', form.querySelector("[name = 'price' ]").value);
        form_data.append('discount', form.querySelector("[name = 'discount' ]").value);
        form_data.append('product_categories', form.querySelector("[name = 'product_categories' ]").value);
        form_data.append('quantity', form.querySelector("[name = 'quantity' ]").value);
        form_data.append('array_data_image', JSON.stringify(array_data_image));
        axios.patch(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    location.reload()
                }
            })
    })

}

main();

const add_image = async () => {
    const data_image = document.querySelector('[data-image]');
    const data = JSON.parse(data_image.getAttribute('data-image')).sort((a, b) => a.position - b.position)
    let array_url_img = data.map(it => it.assets_id.secure_url);
    async function addSequentially(urls) {
        for (const url of urls) {
            upload.addImagesFromPath([url]);
            // đợi đến khi ảnh được render trước khi thêm ảnh tiếp theo
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    await addSequentially(array_url_img);
    // await upload.addImagesFromPath(array_url_img);
    setTimeout(() => {
        const list_img = document.querySelectorAll('.image-preview-item');
        let index = 0;
        for (const it of list_img) {
            it.setAttribute("position", data[index].position)
            it.setAttribute("assets_id", data[index].assets_id._id)
            index++;
        }
    }, 2000);
}

add_image()