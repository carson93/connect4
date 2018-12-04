var end_game = (player_color) => {
    for (let x = 0; x < COLUMNS; x++) {
        var el = document.getElementById('col' + x),
            elClone = el.cloneNode(true);

        el.parentNode.replaceChild(elClone, el);
    }
    // var newColumn = document.createElement("div");

    // newColumn.id = "col" + x;
    // appendChild

    document.getElementById("winner_notif").style.height = '115px';

    document.getElementById("winner_notif").prepend(document.createTextNode(player_color + " wins!!!!!"));


};

export default end_game;