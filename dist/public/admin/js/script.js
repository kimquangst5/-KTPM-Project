const get_cookie = (cookieName) => {
    // Tách chuỗi thành một mảng các cặp name/value
    let cookieArray = document.cookie.split("; ");
    // Chuyển name/value từ dạng string thành object
    cookieArray = cookieArray.map(item => {
        item = item.split("=");
        return {
            name: item[0],
            value: item[1]
        };
    });
    // Lấy ra cookie đang cần tìm
    const cookie = cookieArray.find(item => {
        return item.name === cookieName;
    });

    return cookie ? cookie.value : null;
}

const delete_cookie = name =>
    (document.cookie = `${name}=; expires=Mon, 08 Aug 2005 00:00:00 GMT; path=/`);

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

if (get_cookie('alert')) {
    const alert = decodeURIComponent(get_cookie('alert'));
    const alert_data = JSON.parse(alert);
    quick_alert(alert_data.icon, alert_data.title);
    delete_cookie('alert')
}
