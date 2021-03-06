var count_cubes = 1;
var count_push = 1;
var cubes = new Array();
var numbers = new Array();
var total_score = 0;
var colors_block = new Array('zero', 'one', 'two', 'three', 'four', 'five-and-more');

function get_background_color(number) {
    if (number >= 0 && number < 6) {return colors_block[number]}
    return colors_block[5];
}

function clean_table_score(table) {
    total_score = 0;
    cubes = new Array();
    numbers = new Array();
    document.getElementById("total-score").innerHTML = '';
    while (table.hasChildNodes()) {table.removeChild(table.firstChild);}
}

function push_cube() {
    let table = document.querySelector("table.table");
    clean_table_score(table);
    generate_table_head(table);
    for (cube = 0; cube < count_cubes; cube++) {
        numbers = new Array();
        for (i = 0; i < count_push; i++) {
            numbers.push(random_integer(1,6));
            total_score += numbers[numbers.length-1];
        }
        cubes.push(numbers);
    }
    generate_table_body(table, cubes);
    let push_element = document.getElementById("log");
    document.getElementById("total-score").innerHTML = '<h3>Всего очков: ' + total_score + '</h3>';
}

function generate_node(node_name, text, _class=null) {
    let node = document.createElement(node_name);
    if (text !== '') {
        let text_node = document.createTextNode(text);
        node.appendChild(text_node);
    }
    if (_class !== null) { node.className = _class; }
    return node;
}

function generate_table_head(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    row.appendChild(generate_node("th", "Бросок"));
    for (i = 0; i < count_push; i++) {
        row.appendChild(generate_node("th", i+1));
    }
    row.appendChild(generate_node("th", "Итого"));
    for (i = 1; i <= 6; i++) {
        let th = generate_node("th", "");
        th.appendChild(generate_node("span", i, "block"));
        row.appendChild(th);
    }
}

function generate_table_body(table, cubes) {
    let tbody = table.createTBody();
    for (cube = 0; cube < cubes.length; cube++) {
        let row = tbody.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode('Кубик ' + (cube+1));
        cell.appendChild(text);
        let arr = cubes[cube];
        arr.forEach(function(item, i, arr) {
            let cell = row.insertCell();
            let text = document.createTextNode(item);
            cell.appendChild(text);
        });
        cell = row.insertCell();
        cell.appendChild(generate_node("b", arr.reduce((a, b) => a + b, 0)));
        for (i = 1; i <= 6; i++) {
            let count_number = arr.filter(function(number){return number == i;}).length;
            row.insertCell().appendChild(generate_node("span", count_number, "block no-text " + get_background_color(count_number)));
        }
    }
}

function random_integer(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}