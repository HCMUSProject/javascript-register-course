// khi form load thi can load du lieu vao trong cac select tag

var date = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var $yearSelectBox = document.getElementById('yearOfBirth');

var $monthSelectBox = document.getElementById('monthOfBirth');

var $dateSelectBox = document.getElementById('dateOfBirth');

window.addEventListener('load', () => {
    LoadYear();
    LoadDate();
})

// load nam
function LoadYear() {
    // load nam
    var dateNow = new Date(Date.now());

    var year = {
        from: 1970,
        to: dateNow.getFullYear()
    }

    for (let i = year.from; i <= year.to; i++) {
        let $option = document.createElement('option');
        let text = document.createTextNode(i);

        $option.appendChild(text);
        $option.setAttribute('value', i);

        if (i === 1998)
            $option.setAttribute('selected', 'selected');

        $yearSelectBox.appendChild($option);
    }
}

// load ngay
function LoadDate(curDate = 1) {
    // remove all option
    $dateSelectBox.innerHTML = '';

    let curMonth = parseInt($monthSelectBox[$monthSelectBox.selectedIndex].value);
    for (let i = 1; i <= date[curMonth]; i++) {
        let $option = document.createElement('option');

        let text = document.createTextNode(i);

        $option.appendChild(text);
        $option.setAttribute('value', i);

        if (i === curDate)
            $option.setAttribute('selected', 'selected');

        $dateSelectBox.appendChild($option);
    }
}

$monthSelectBox.addEventListener('change', (event) => {
    let curDate = parseInt($dateSelectBox[$dateSelectBox.selectedIndex].value);

    // thang 2 thi phai check nam nhuan hay khong
    if (parseInt($monthSelectBox[$monthSelectBox.selectedIndex].value) == 2) {
        if ((parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 4 === 0
            && parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 100 !== 0)
            || parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 400 === 0) {
            // nam nhuan
            date[2] = 28;

            if (curDate > date[2])
                curDate = 1;
        }
        else {
            date[2] = 29;

            if (curDate > date[2])
                curDate = 1;
        }
    }

    // get current date

    LoadDate(curDate);
})

$yearSelectBox.addEventListener('change', function () {
    let curDate = parseInt($dateSelectBox[$dateSelectBox.selectedIndex].value);

    // thang 2 thi phai check nam nhuan hay khong
    if (parseInt($monthSelectBox[$monthSelectBox.selectedIndex].value) == 2) {
        if ((parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 4 === 0
            && parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 100 !== 0)
            || parseInt($yearSelectBox[$yearSelectBox.selectedIndex].value) % 400 === 0) {
            // nam nhuan
            date[2] = 28;

            if (curDate > date[2])
                curDate = 1;
        }
        else {
            date[2] = 29;

            if (curDate > date[2])
                curDate = 1;
        }
    }

    LoadDate(curDate);
})