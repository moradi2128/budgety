// date

let dateTop = document.querySelector('.budget__title--month');
now = new Date();
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
month = now.getMonth();
year = now.getFullYear();
let datestring = months[month] + " " + year;
dateTop.innerHTML = datestring;
//  select
const type = document.querySelector('.add__type');
const incomeselect = document.querySelector('.inc');
const expensesselect = document.querySelector('.exp');
const adddescription = document.querySelector('.add__description');
let addvalue = document.querySelector('.add__value');
let clickadd = document.querySelector('.add__btn');
let budgetvalue = document.querySelector('.budget__value');
let budgetincomevalue = document.querySelector('.budget__income--value')
let budgetexpensesvalue = document.querySelector('.budget__expenses--value')
let incomelist = document.querySelector('.income');
let expenseslist = document.querySelector('.expenses');
let addtypeopatin = document.querySelector('.add__type');
let budgetexpensesPercentage = document.querySelector('.budget__expenses--percentage');
// rest
initialization();

function initialization() {
    budgetvalue.textContent = '0.00';
    budgetincomevalue.textContent = '0.00';
    budgetexpensesvalue.textContent = '0.00';
    budgetexpensesPercentage.textContent = '---';
}
// chang color icon
addtypeopatin.addEventListener('change', red);

function red() {
    if (type.options[type.selectedIndex].value == "exp") {
        addvalue.classList.add("red-focus")
        adddescription.classList.add("red-focus")
        addtypeopatin.classList.add("red-focus")
        clickadd.classList.add("red")
    } else if (type.options[type.selectedIndex].value == "inc") {
        addvalue.classList.remove("red-focus")
        adddescription.classList.remove("red-focus")
        addtypeopatin.classList.remove("red-focus")
        clickadd.classList.remove("red")
    }
}
// click add__btn
clickadd.addEventListener('click', incomeFunction);
document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        incomeFunction();
    }
});

// General
function incomeFunction() {
    let b = addvalue.value;
    let bv = budgetvalue.textContent;
    let ad = adddescription.value;
    let biv = budgetincomevalue.textContent;
    let bev = budgetexpensesvalue.textContent;
    let id = Math.floor(Math.random() * 100);
    // percentages
    if (biv > 0) {
        percentages = Math.round((b / biv) * 100) + "%";
    } else {
        percentages = "---"
    }
    // پیغام خطا برای فیلد
    if (ad == "") {
        alert('Please enter a Title');
        return;
    }
    if (b < 0 || b == "") {
        alert('Please enter an integer');
        return;
    }
    if (b == 0) {
        alert('You can not enter the value to zero')
        return
    }
    // rest input value
    restinput()

    function restinput() {
        addvalue.value = "";
        adddescription.value = "";
    }

    // for income
    if (type.options[type.selectedIndex].value == "inc") {
        let plus = parseFloat(b) + parseFloat(bv);
        let incomeplus = parseFloat(b) + parseFloat(biv);
        budgetincomevalue.innerHTML = incomeplus;
        budgetvalue.innerHTML = plus;
        boxincomevalue();
    }
    // for expenses
    if (type.options[type.selectedIndex].value == "exp") {
        let minus = parseFloat(bv) - parseFloat(b);
        let expensesplus = parseFloat(b) + parseFloat(bev)
        budgetexpensesvalue.innerHTML = expensesplus;
        budgetvalue.innerHTML = minus;
        boxexpensesvalue()
            // item expenses percentage
        let click = this
        let percentagexpenses = click.parentNode.parentNode.nextElementSibling.lastChild.previousElementSibling.lastChild.lastChild.previousElementSibling.firstChild.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.nextElementSibling.textContent;
        if (budgetexpensesPercentage.innerHTML === '---') {
            if (percentagexpenses == '---') {
                document.querySelector('.budget__expenses--percentage').textContent = '---'
            } else {
                document.querySelector('.budget__expenses--percentage').textContent = '---'
                budgetexpensesPercentage.innerHTML = parseFloat(percentagexpenses) + '%';
            }
        } else {
            let sa = parseFloat(budgetexpensesPercentage.innerHTML)
            budgetexpensesPercentage.innerHTML = sa + parseFloat(percentagexpenses) + '%'
        }
    }
    // add & remove box income
    function boxincomevalue() {
        let boxincome = document.createElement('div');
        boxincome.className = 'income__list';
        let html = `<div class="item clearfix" >
        <div class="item__description">${ad}</div>
        <div class="right clearfix">
            <div class="item__value">${b}</div>
            <div class="item__delete" id="inc-${id}"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>
        </div>
        </div>`
        boxincome.innerHTML = html
        incomelist.appendChild(boxincome);
        // remove box & minus budeget and income value 

        let incomeId = document.querySelector('#inc-' + id);
        incomeId.addEventListener('click', deleteMinusIncome)

        function deleteMinusIncome(event) {
            let boxincome = this
            let itemValueIncome = boxincome.previousElementSibling.innerHTML;
            let boxin = boxincome.parentNode.parentNode
            budgetincomevalue.innerHTML -= itemValueIncome;
            budgetvalue.innerHTML -= itemValueIncome;
            boxin.remove()
        }
    }


    // add & remove box expenses
    function boxexpensesvalue() {
        let boxexpenses = document.createElement('div');
        boxexpenses.className = 'expenses__list';
        boxexpenses.innerHTML = `<div class="item clearfix">
        <div class="item__description">${ad}</div>
        <div class="right clearfix">
            <div class="item__value">${b}</div>
            <div class="item__percentage">${percentages}</div>
            <div class="item__delete"id="exp-${id}"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>
        </div>
        </div> `;
        expenseslist.appendChild(boxexpenses);

        // remove box & minus budeget and expenses value 

        let expensesId = document.querySelector('#exp-' + id);
        expensesId.addEventListener('click', delteMinusExpenses)

        function delteMinusExpenses(event) {
            let boxExpenses = this;

            // .expenses__list
            let boxex = boxExpenses.parentNode.parentNode;
            // .item__value

            let itemValueExpenses = boxExpenses.previousElementSibling.previousElementSibling.innerHTML;

            // .item__percentage
            let itempercentage = boxExpenses.previousElementSibling.innerHTML;
            let numberBEP = parseFloat(budgetexpensesPercentage.innerHTML)
            budgetexpensesPercentage.innerHTML = numberBEP - parseFloat(itempercentage) + '%';
            if (budgetexpensesPercentage.innerHTML === '0%') {
                budgetexpensesPercentage.innerHTML = '---'
            }
            if (itempercentage === '---') {
                budgetexpensesPercentage.innerHTML = '---'
            }
            // item budeget expenses value
            budgetexpensesvalue.innerHTML -= itemValueExpenses;
            let numbervalue = parseFloat(budgetvalue.innerHTML) + parseFloat(itemValueExpenses)
            budgetvalue.innerHTML = numbervalue;
            // remove expenses box
            boxex.remove()
        }
    }

}