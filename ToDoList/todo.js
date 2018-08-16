// Get DOM Elements
let form = document.querySelector("form");
let list = document.querySelector(".list-group");

// Set local storage
let items = JSON.parse(localStorage.getItem("items")) || [];
reloadDisplay();

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
    update();
    this.reset();
}

function reloadDisplay(){
    list.innerHTML = items.map((item, i) => {
        return `
        <li class="list-group-item">
            <div>
                <input type="checkbox" data-index="${i}" ${item.checked ? 'checked' : ''}/><label>${item.text}</label>
            </div>
            <button class="btn" data-index="${i}"><i class="fa fa-close" data-index="${i}"></i></button>
        </li>
        `;
    }).join('');
}

function updateData(e){
    if(e.target.matches("input")){//checkbox
        let targetIndex = e.target.dataset.index;
        console.log(targetIndex);
        // flip checked
        items[targetIndex].checked = !items[targetIndex].checked;

        organizeItems();
        update();
    } else if(e.target.matches("button") || e.target.matches("i")){
        console.log(e.target.parentNode);
        //delete from array
        let targetIndex = e.target.dataset.index;
        items.splice(targetIndex, 1);
        update();
    }
}

// updates data and display
function update(){
    reloadDisplay();
    localStorage.setItem('items', JSON.stringify(items));
}

// Run this to move checked items to bottom of list and unchecked to top
function organizeItems(){
    items.sort((item1, item2) => {
        if(item1.checked && !item2.checked){
            return 1;
        } else{
            return -1;
        }
    })
}