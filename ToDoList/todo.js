let form = document.querySelector("form");
let list = document.querySelector(".list-group");

let items = JSON.parse(localStorage.getItem("items")) || [];
updateDisplay();

form.addEventListener("submit", addItem);
list.addEventListener("click", updateData);

function addItem(e){
    e.preventDefault();
    let text = form.querySelector("#newItem").value;
    let newItem = {
        text: text,
        checked: false
    };
    items.push(newItem);
    updateDisplay();
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
    console.log(items);
}

function updateDisplay(){
    list.innerHTML = items.map((item, i) => {
        return `
        <li class="list-group-item">
            <div>
                <input type="checkbox" data-index="${i}" ${item.checked ? 'checked' : ''}/><label>${item.text}</label>
            </div>
            <button class="btn" data-index="${i}"><i class="fa fa-close"></i></button>
        </li>
        `;
    }).join('');
}

function updateData(e){
    console.log(e.target);
    if(e.target.matches("input")){
        let targetIndex = e.target.dataset.index;
        console.log(targetIndex);
        // flip checked
        items[targetIndex].checked = !items[targetIndex].checked;
        localStorage.setItem('items', JSON.stringify(items));
    } else if(e.target.matches("button") || e.target.matches("i")){
        //delete from array
        let targetIndex = e.target.dataset.index;
        items.splice(targetIndex, 1);
        updateDisplay();
        localStorage.setItem('items', JSON.stringify(items));
    }
}