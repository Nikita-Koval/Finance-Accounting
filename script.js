let allCases = [];
let valueText = '';
let valueSum = ''
let indexEdit = -1;
let count = 0;
let counter = [];

window.onload = async function init() {
    inputText = document.getElementById('newText');
    inputText.addEventListener('change', updateValue);
    inputSum = document.getElementById('newSum');
    inputSum.addEventListener('change', updateValueSum);
    totalSum = document.getElementById('totalSum');
    date = document.getElementById('newDate');
    date.addEventListener('change', updateDate);
    const resp = await fetch('http://localhost:7000/allTasks', {
        method: 'GET'
    });
    let result = await resp.json();
    allCases = result;
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

addFunc = async () => {
    if(inputText.value === '' || date.value === '' || inputSum.value === '') {
        alert('Enter your case !');
    } else {
        allCases.push(
            {text: valueText,
            date: valueDate,
            sum: valueSum});
        // counter.push(valueSum)
        // let i = 0;

        // while(i < counter.length) {
        //     console.log(counter);
        //     i++
        // }
        const resp = await fetch('http://localhost:7000/createTask', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify( {
                text: valueText,
                date: valueDate,
                sum: valueSum
            })
        });
        let result = await resp.json();
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

render = async () => {
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

            const imgEdit = document.createElement('img');
            imgEdit.src = 'img/accept.ico';
            imgEdit.className = 'editPng';
            editingFunc = async () => {
                allCases[indexEdit].text = text.value;
                allCases[indexEdit].date = date.value;
                allCases[indexEdit].sum = sum.value;
                if(allCases[indexEdit].text === '' || allCases[indexEdit].date === '' || allCases[indexEdit].sum === '') {
                    alert('Incorrect value. Add value please...');
                } else {
                    const resp = await fetch('http://localhost:7000/updateTask', {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(allCases[indexEdit])
                });
                let result = await resp.json();
                totalSum.innerText = `Total: ${count} rub.`;
                indexEdit = -1;
                render();
            }
            } //saving edit function

            imgContEdit.appendChild(imgEdit);
            imgEdit.addEventListener('click', editingFunc);
            
            const imgCanc = document.createElement('img');
            imgCanc.src = 'img/canc.png';
            imgCanc.className = 'editPng';
            imgContEdit.appendChild(imgCanc);
            imgCanc.onclick = (text) => {
                indexEdit = -1;
                render();
            }
        } else { //creating paragraph(non edit)
            const text = document.createElement('p');
            text.className = 'textBlock';
            text.innerText = `${index + 1}) Shop: ${item.text}`;
            container.appendChild(text); //creating shop text

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
            } //editing value in array
        }
        content.appendChild(container);
    });
} //rendering array

delFunc = async (item, index) => {
    const resp = await fetch(`http://localhost:7000/deleteTask?_id=${allCases[index]._id}`, {
        method: 'DELETE'
    });
    let result = await resp.json();
    allCases.splice(index, 1);
    count = count - Number(item.sum);
    totalSum.innerText = `Total: ${count} rub.`;
    render()
} //deleting case function