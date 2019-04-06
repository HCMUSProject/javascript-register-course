// do du lieu vao trong available select tag
var listCourses = ['Chuyên đề Java', 'CSDL Web', 'Trí tuệ nhân tạo', 'Công nghệ phần mềm', 'Lập trình Windows', 'Cấu trúc dữ liệu', 'Lập trình hướng đối tượng'];

var $availableCourses = document.getElementById('available-courses');

var $selectedCourses = document.getElementById('selected-courses');

var $btnAddCourse = document.getElementById('btnAddCourse');
var $btnAddAllCourses = document.getElementById('btnAddAllCourses');
var $btnRemoveCourse = document.getElementById('btnRemoveCourse');
var $btnRemoveAllCourses = document.getElementById('btnRemoveAllCourses');


var $btnRegister = document.getElementById('btnRegister');

function getCoursesToSelectBox() {
    $availableCourses.innerHTML = '';

    listCourses.forEach((el, key) => {

        let $option = document.createElement('option');

        let text = document.createTextNode(el);

        $option.setAttribute('value', key);

        $option.appendChild(text);

        $availableCourses.appendChild($option);
    })
}


function TransferCourseBetween2Box(fromSelectBox, toSelectBox){
    // $availableCourses.selectedIndex = -1;

    $selectedItems = Array.from(fromSelectBox.querySelectorAll('option')).filter(value => value.selected !== false);

    // console.log($selectedItems);

    // add vao selected course
    $selectedItems.map(value => {
        let $option = document.createElement('option');

        $option.innerText = value.text;

        $option.value = value.value;

        toSelectBox.appendChild($option);
    })

    // remove nhung course da chon
    $notSelectedItems = Array.from(fromSelectBox.querySelectorAll('option')).filter(value => value.selected === false);

    fromSelectBox.innerHTML = '';

    $notSelectedItems.map(value => {
        fromSelectBox.appendChild(value);
    })
}

function TransferAllCourseBetween2Box(fromSelectBox, toSelectBox){
    Array.from(fromSelectBox.querySelectorAll('option')).map(value => {
        toSelectBox.appendChild(value);
    })
    fromSelectBox.innerHTML = '';
}

$btnAddCourse.addEventListener('click', () => {
    TransferCourseBetween2Box($availableCourses, $selectedCourses);
})

$btnAddAllCourses.addEventListener('click', () => {
    TransferAllCourseBetween2Box($availableCourses, $selectedCourses);
})

$btnRemoveCourse.addEventListener('click', () => {
    TransferCourseBetween2Box($selectedCourses, $availableCourses);
})

$btnRemoveAllCourses.addEventListener('click', () => {
    TransferAllCourseBetween2Box($selectedCourses, $availableCourses);
})


// function validateForm(){
    
// }

// $btnRegister.addEventListener('click', () => {

// })



// ==================================================================================

window.addEventListener('load', () => {
    getCoursesToSelectBox();
});
