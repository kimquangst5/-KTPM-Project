const fun_carousel = () => {
    const carousel = document.querySelector('.carousel-thumbnails');
    const scroller = document.querySelector('.thumbnails__scroller');
    const thumbnails = document.querySelectorAll('.thumbnails__image');
    if (!scroller) return
    if (!thumbnails) return
    if (!carousel) return
    scroller.addEventListener('click', e => {
        const target = e.target;

        if (target.matches('.thumbnails__image')) {
            const index = [...thumbnails].indexOf(target);
            carousel.goToSlide(index);
        }
    });

    carousel.addEventListener('sl-slide-change', e => {
        const slideIndex = e.detail.index;

        [...thumbnails].forEach((thumb, i) => {
            thumb.classList.toggle('active', i === slideIndex);
            if (i === slideIndex) {
                thumb.scrollIntoView({
                    block: 'nearest'
                });
            }
        });
    });
}
fun_carousel()

const quick_alert = (icon = 'success', title = 'Thành công') => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: title
    });
}

const get_alert = async () => {
    const cookie = await cookieStore.get("alert")
    if (cookie) {
        const alert = decodeURIComponent(cookie.value);
        const alert_data = JSON.parse(alert);
        quick_alert(alert_data.icon, alert_data.title);
        cookieStore.delete("alert")
    }
}
get_alert()

const confirm_alert = (title, text, func) => {
    Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
        cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            func()
        }
    });
}


const btn_submit = () => {
    const btn = document.querySelector("[btn-submit]");
    if (!btn) return;
    window.addEventListener("keydown", (e) => {
        if (e.key === 'F1' || e.keyCode === 112) {
            e.preventDefault();
            btn.click();
        }
    })
}