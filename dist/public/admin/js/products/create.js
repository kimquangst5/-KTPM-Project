
const main = () => {
    const form = document.querySelector('form[new-products]');
    const btn_submit = document.querySelector('[btn-submit]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    btn_submit.addEventListener('click', () => {
        const form_data = new FormData();
        form_data.append('name', form.querySelector("[name = 'name' ]").value);
        form_data.append('description', form.querySelector("[name = 'description' ]").value);
        form_data.append('price', form.querySelector("[name = 'price' ]").value);
        form_data.append('discount', form.querySelector("[name = 'discount' ]").value);
        form_data.append('product_categories', form.querySelector("[name = 'product_categories' ]").value);
        form_data.append('quantity', form.querySelector("[name = 'quantity' ]").value);
        let list_files = form.querySelector("[name = 'images' ]").files
        if (list_files && list_files.length > 0) {
            for (const file of list_files) {
                form_data.append('images', file);
            }
        }
        axios.post(form.getAttribute("action"), form_data)
            .then(res => {
                if (res.data.success) {
                    location.reload()
                }
            })
    })

}

main();

const init_filepond = () => {

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageExifOrientation,
        FilePondPluginFileValidateSize,
        FilePondPluginImageEdit,
        FilePondPluginFileValidateType,
        FilePondPluginImageResize,
        FilePondPluginImageCrop,
    );

    // Select the file input and use 
    // create() to turn it into a pond
    FilePond.create(
        document.querySelector("[name = 'images']"), {
            // imageEditEditor: FilePond.pintura,
            allowImageResize: true,
            allowImageCrop: true,
            // imageEditInstantEdit: true,
            imageEditAllowEdit: true,
            allowImageEdit: true,
            // imageEditEditor: Doka.create({
            //     // Doka.js options here ...

            //     cropAspectRatioOptions: [{
            //             label: 'Free',
            //             value: null,
            //         },
            //         {
            //             label: 'Portrait',
            //             value: 1.25,
            //         },
            //         {
            //             label: 'Square',
            //             value: 1,
            //         },
            //         {
            //             label: 'Landscape',
            //             value: 0.75,
            //         },
            //     ],
            // }),
            // createEditor: openEditor,
        }
    );
    FilePond.setOptions({
        labelIdle: `Kéo & thả tệp của bạn hoặc <span class="filepond--label-action">Click vào để chọn file</span>`
    });
      
}
init_filepond()