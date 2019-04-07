var minimunCourses = 1;

// do du lieu vao trong available select tag
var listCourses = [{
    id: 1,
    course: 'Chuyên đề Java'
},
{
    id: 2,
    course: 'CSDL Web'
},
{
    id: 3,
    course: 'Trí tuệ nhân tạo'
},
{
    id: 4,
    course: 'Công nghệ phần mềm'
},
{
    id: 5,
    course: 'Lập trình Windows'
},
{
    id: 6,
    course: 'Cấu trúc dữ liệu'
},
{
    id: 7,
    course: 'Lập trình hướng đối tượng'
}];

// du lieu nguoi dang ki
var listRegistration = [];

// define
var $availableCourses = document.getElementById('available-courses');

var $selectedCourses = document.getElementById('selected-courses');

var $btnAddCourse = document.getElementById('btnAddCourse');
var $btnAddAllCourses = document.getElementById('btnAddAllCourses');
var $btnRemoveCourse = document.getElementById('btnRemoveCourse');
var $btnRemoveAllCourses = document.getElementById('btnRemoveAllCourses');

var $btnRegister = document.getElementById('btnRegister');

var $txtID = document.getElementById('txtID');
var $txtName = document.getElementById('txtName');
var $rdMale = document.getElementById('male');
var $rdFemale = document.getElementById('female');


var $dateOfBirth = document.getElementById('dateOfBirth');
var $monthOfBirth = document.getElementById('monthOfBirth');
var $yearOfBirth = document.getElementById('yearOfBirth');

var tbody = document.getElementById('registration-table').querySelector('tbody');

// ================= FUNCTION =======================

function getCoursesToSelectBox() {
    $availableCourses.innerHTML = '';

    listCourses.forEach((el, key) => {

        let $option = document.createElement('option');

        let text = document.createTextNode(el.course);

        $option.setAttribute('value', el.id);

        $option.appendChild(text);

        $availableCourses.appendChild($option);
    })
}


function TransferCourseBetween2Box(fromSelectBox, toSelectBox) {
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

function TransferAllCourseBetween2Box(fromSelectBox, toSelectBox) {
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


function validateForm() {
    if ($txtID.value === '')
        return {
            res: false,
            mes: 'Mã số không được để rỗng!'
        };

    if ($txtName.value === '')
        return {
            res: false,
            mes: 'Tên không được để rỗng!'
        };

    if ($rdFemale.checked === false && $rdMale.checked === false)
        return {
            res: false,
            mes: 'Giới tính không được để rỗng!'
        };

    if (Array.from($selectedCourses).length === 0)
        return {
            res: false,
            mes: `Phải chọn ít nhất ${minimunCourses} môn học để đăng kí!`
        };

    return {
        res: true,
        mes: 'Validated'
    }

}

function ShowMessage(message) {
    // truoc tien phai dim screen
    let dimScreen = document.createElement('div');

    dimScreen.setAttribute('class', 'dim-screen');

    document.body.appendChild(dimScreen);

    let messageBox = document.createElement('div');

    messageBox.innerHTML = `
        <div class="wrapper">
            ${message}
        </div>
        <div class="text-right">
            <button class="button-close btn btn-primary">Đóng</button>
        </div>
    `;
    messageBox.setAttribute('class', 'message');
    messageBox.setAttribute('id', 'view-detail');

    messageBox.querySelector('.button-close').addEventListener('click', function () {

        dimScreen.remove();
        messageBox.remove();
    })

    document.body.appendChild(messageBox);
}

$btnRegister.addEventListener('click', () => {
    let validateForm = this.validateForm();
    if (validateForm.res === false) {
        // xuat ra thong bao loi
        ShowMessage(validateForm.mes);
    }
    else {
        let sex = 0;

        if ($rdFemale.checked === true)
            sex = parseInt($rdFemale.value);
        else {
            sex = parseInt($rdMale.value);
        }

        // get id of selected courses
        let arrSelectedCourses = [];
        $selectedCourses.querySelectorAll('option').forEach((el, idx) => {
            arrSelectedCourses.push(parseInt(el.value));
        })

        let student = {
            uid: Math.floor(Math.random() * 9999999),
            id: $txtID.value,
            name: $txtName.value,
            sex: sex,
            DOB: {
                date: $dateOfBirth[$dateOfBirth.selectedIndex].value,
                month: $monthOfBirth[$monthOfBirth.selectedIndex].value,
                year: $yearOfBirth[$yearOfBirth.selectedIndex].value,
            },
            listCourses: [...arrSelectedCourses]
        }
        // kiem tra trong list dang ki da co hoc sinh voi id nay chua
        let res = listRegistration.find((element) => {
            return element.id === student.id;
        })

        if (res != null) {
            ShowMessage('Sinh viên này đã đăng ký trước đó.')
            return;
        }

        // render ra table

        listRegistration.push(student);

        ShowStudentOnTable(student);
    }
})


function ShowStudentOnTable(student) {

    const contentRow = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.sex === 0 ? 'Nữ' : 'Nam'}</td>
        <td>${student.DOB.date}/${student.DOB.month}/${student.DOB.year}</td>
    `;

    let $row = document.createElement('tr');

    $row.setAttribute('uid', student.uid);
    $row.innerHTML = contentRow;

    // set su kien
    $row.addEventListener('click', () => {
        // dim screen
        let dimScreen = document.createElement('div');

        dimScreen.setAttribute('class', 'dim-screen');

        document.body.appendChild(dimScreen);

        // show thong tin
        let strTemp = '';

        student.listCourses.map((value, key) => {
            // console.log(listCourses.find(element => element.id === value).course);
            strTemp += `<p>${listCourses.find(element => element.id === value).course}</p>`;
        });

        // console.log(student);

        let viewDetail = document.createElement('div');

        viewDetail.innerHTML = `
            <div class="wrapper">
                <p>Mã số: ${student.id}</p>
                <p>Họ tên: ${student.name}</p>
                <p>Giới tính: ${student.sex === 0 ? 'Nữ' : 'Nam'}</p>
                <p>Ngày sinh: ${student.DOB.date}/${student.DOB.month}/${student.DOB.year}</p>
                <p>Môn học:</p>
                <div class="registed-courses">${strTemp}</div>
            </div>
            <div class="text-right">
                <button class="button-close btn btn-primary">Đóng</button>
            </div>
        `;
        viewDetail.setAttribute('id', 'view-detail');
        viewDetail.setAttribute('data', student.uid);

        viewDetail.querySelector('.button-close').addEventListener('click', function () {
            dimScreen.remove();
            viewDetail.remove();
        })

        document.body.appendChild(viewDetail);
    })



    tbody.appendChild($row);

    // // add event for button close
    // document.getElementById('view-detail').querySelector('.button-close').addEventListener('click', () => {
    //     // remove #view-detail ra khoi DOM
    //     document.getElementById('view-detail').remove();
    // })
}









// ==================================================================================

window.addEventListener('load', () => {
    getCoursesToSelectBox();
});
