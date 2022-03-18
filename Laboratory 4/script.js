const btn = document.getElementById('array_button');

btn.addEventListener('click', function handleClick(event) {
    // 👇️ if you are submitting a form (prevents page reload)
    event.preventDefault();

    var array = document.getElementById('array_input');

    // Send value to server
    console.log(array.value);

    var string_array = array.value;
    var numbers = string_array.split(' ').map(Number);

    // sort the array
    let sorted = numbers.sort((a, b) => a - b);

    console.log(sorted);

    createTable(sorted);

    // 👇️ clear input field
    array.value = '';
});

function createTable(numbers){

    const table = document.createElement('table');
    const body = document.body;

    /* The sorted array (which can have any length) will be displayed in a <table>
       with 5 columns and n/5 lines where n is the length of the array. */

    // create a table with 5 columns and n/5 lines

    for (let i = 0; i < (numbers.length) / 5; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 5; j++) {
            const col = row.insertCell();
            if(i * 5 + j < numbers.length) {
                col.appendChild(document.createTextNode(numbers[j + i*5]));
            }
        }

    }

    body.appendChild(table);

}
