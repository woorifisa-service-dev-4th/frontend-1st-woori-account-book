const dateInput = document.getElementById("date");
const [selectOption] = document.getElementsByTagName('select');
const descriptionInput = document.getElementById("description");
const moneyInput = document.getElementById("money");
const addButtonInput = document.getElementsByClassName("container_add-btn")[0];

let dateValue = dateInput.value;
let selectedOption = selectOption.value;
let descriptionValue = descriptionInput.value;
let moneyValue = moneyInput.value;

console.log(dateValue);

/* 입력 값 저장 */
dateInput.addEventListener('input', (event) => {
    dateValue = event.target.value;
    console.log(dateValue);
})

selectOption.addEventListener('change', (event) => {
    selectedOption = event.target.value;
    console.log(selectedOption);
})

descriptionInput.addEventListener('input', (event) => {

    descriptionValue = event.target.value;
    console.log(descriptionValue);

})

moneyInput.addEventListener('input', (event) => {

    moneyValue = event.target.value;
    console.log(moneyValue);

})


/* 추가 버튼 누를 시 입력 값들 TABLE에 전달 */
addButtonInput.addEventListener('click', async() => {
    // 테이블의 tbody 선택
    const tableBody = document.querySelector(".contianer_table tbody");

    // 새로운 행 생성
    const newRow = document.createElement("tr");
    newRow.className = "contianer_table_contents";

    // 각 열 생성 및 데이터 추가
    const dateCell = document.createElement("td");
    dateCell.textContent = dateValue || "X";

    const optionCell = document.createElement("td");
    optionCell.textContent = selectedOption || "X";

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = descriptionValue || "X";

    const moneyCell = document.createElement("td");
    moneyCell.textContent = moneyValue || "X";

    // 새로운 행에 열 추가
    newRow.appendChild(dateCell);
    newRow.appendChild(optionCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(moneyCell);

    // 테이블의 tbody에 새로운 행 추가
    tableBody.appendChild(newRow);

    // 입력 필드 초기화 (선택 사항)
    descriptionInput.value = "";
    moneyInput.value = "";
    descriptionValue = "";
    moneyValue = "";

    console.log("새로운 행이 추가되었습니다!");

})

