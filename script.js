let allCases = [];
let valueText = '';
let valueSum = ''
let indexEdit = -1;
let count = 0;

window.onload = async function init() {
    inputText = document.getElementById('newText');
    inputText.addEventListener('change', updateValue);
    inputSum = document.getElementById('newSum');
    inputSum.addEventListener('change', updateValueSum);
    totalSum = document.getElementById('totalSum');
    date = document.getElementById('newDate');
    date.addEventListener('change', updateDate)
    render()
} //loading by open page

updateValue = (event) => {
    valueText = event.target.value;
    tempShop = valueText;
} //updating text value function

updateDate = (event) => {
    valueDate = event.target.value;
    // console.log(valueDate)
} //updating date function

updateValueSum = (event) => {
    valueSum = event.target.value;
} //updating sum value function

clickAdd = () => {
    addFunc();
} //adding by click function

btnAdd = (text, sum) => {
    if (event.keyCode == 13) {
        addFunc();
    }
} //adding by enter function

addFunc = () => {
    if(inputText.value === '' || date.value === '' || inputSum.value === '') {
        alert('Enter your case !');
    } else {
        allCases.push(
            {text: valueText,
            date: valueDate,
            sum: valueSum});
        count = count + Number(valueSum);
        totalSum.innerText = `Total: ${count} rub.`;
        valueText = '';
        valueDate = ''
        valueSum = '';
        inputText.value = '';
        date.value = ''
        inputSum.value = '';
        render();
    }
} //checking input-length, adding cases function item.text

render = () => {
    const content = document.getElementById('content_page');
    while(content.firstChild) {
        content.removeChild(content.firstChild);
    }
    
    allCases.forEach((item, index) => {
        const container = document.createElement('div');
        container.className = 'task_container';

        if(index === indexEdit) { //creating textarea(when edit)
            const text = document.createElement('input');
            text.className = 'textBlockArea'
            text.value = item.text;
            container.appendChild(text); //creating shop textarea

            const date = document.createElement('input');
            date.setAttribute('type', 'date');
            date.className = 'textBlockArea';
            date.value = item.date;
            valueDate = item.date;
            container.appendChild(date); //creating date textarea

            const sum = document.createElement('input');
            sum.className = 'textBlockArea'
            sum.value = item.sum;
            sum.setAttribute('type', 'number');
            container.appendChild(sum); //creating sum textarea

            const imgContEdit = document.createElement('div');
            imgContEdit.className = 'imgCont';
            container.appendChild(imgContEdit); //creating img container

            const imgDone = document.createElement('img');
            imgDone.src = 'img/done.png';
            imgDone.className = 'editPng';
            imgDone.onclick = () => {
                allCases[indexEdit].text = text.value;
                allCases[indexEdit].date = date.value;
                allCases[indexEdit].sum = sum.value;
                if(allCases[indexEdit].text === '' || allCases[indexEdit].date === '' || allCases[indexEdit].sum === '') {
                    alert('Incorrect value. Add value please...');
                } else {
                totalSum.innerText = `Total: ${count} rub.`;
                indexEdit = -1;
                render();
            }
            } //saving edit function
            imgContEdit.appendChild(imgDone);

            const imgCanc = document.createElement('img');
            imgCanc.src = 'img/cancel.webp';
            imgCanc.className = 'editPng';
            imgContEdit.appendChild(imgCanc);
            imgCanc.onclick = function(text){
                indexEdit = -1;
                render();
            }
        } else { //creating paragraph(non edit)
            const text = document.createElement('p');
            text.className = 'textBlock';
            text.innerText = `${index + 1}) Shop: ${item.text}`;
            container.appendChild(text); //creating shop text
            // editDouble = (text) => {
            //     text.setAttribute("contenteditable", "true");
            // }
            // text.addEventListener('dbclick', editDouble);

            const dateText = document.createElement('p');
            dateText.className = 'dateDiv';
            dateText.innerText = `Date: ${item.date}`;
            container.appendChild(dateText); //creating date text

            const sum = document.createElement('p');
            sum.className = 'textBlockSum'
            sum.innerText = `Sum: ${item.sum} rub.`;
            container.appendChild(sum); //creating sum text

            const imgCont = document.createElement('div');
            imgCont.className = 'imgCont';
            container.appendChild(imgCont); //creating img container
            
            const imgEdit = document.createElement('img');
            imgEdit.src = 'img/dit.png';
            imgEdit.className = 'editPng';
            imgCont.appendChild(imgEdit); //creating edit img

            const imgDel = document.createElement('img');
            imgDel.src = 'img/del.png';
            imgDel.className = 'editPng';
            imgCont.appendChild(imgDel); //creating delete img

            imgDel.onclick = () => {
                delFunc(item, index)
            }; //deleting from array 

            imgEdit.onclick = (text) => {
                indexEdit = index;
                render();
            } //editing value in array !!создать новые значения переменные item.text, item.sum, item.date
        }
        content.appendChild(container);
    });
} //rendering array

delFunc = (item, index) => {
    allCases.splice(index, 1);
    count = count - Number(item.sum);
    totalSum.innerText = `Total: ${count} rub.`;
    render()
} //deleting case function