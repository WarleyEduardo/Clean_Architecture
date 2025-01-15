document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            window.location.href = page;
        });
    });



    const fecharMenubtn = this.getElementById('fecharMenuBtn');


    fecharMenubtn.onclick = function () {

        const page = fecharMenubtn.getAttribute('data-page');
        window.location.href = page;
    }


});


