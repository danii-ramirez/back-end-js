const socket = io();

socket.emit('message', '');

socket.on('data', (data) => {
    let ul = document.getElementById("products");

    data.forEach(p => {
        var li = document.createElement("li");
        var text = document.createTextNode(p.title);
        li.appendChild(text);
        ul.appendChild(li);
    });
});