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

    if(!dateValue) {
        alert("날짜를 입력해주세요.")
        dateInput.focus();
        return;
    }
    console.log(dateValue);
})

selectOption.addEventListener('change', (event) => {
    selectedOption = event.target.value;
    console.log(selectedOption);
})

descriptionInput.addEventListener('input', (event) => {

    descriptionValue = event.target.value.trim();
    console.log(descriptionValue);

})

moneyInput.addEventListener('input', (event) => {

    moneyValue = event.target.value.trim();
    console.log(moneyValue);

})


/* 추가 버튼 누를 시 필요한 입력 값들 TABLE에 전달 */
addButtonInput.addEventListener('click', () => {
    // 테이블의 tbody 선택
    const tableBody = document.querySelector(".contianer_table tbody");

    // 새로운 행 생성
    const newRow = document.createElement("tr");
    newRow.className = "contianer_table_contents";

    // 각 열 생성 및 데이터 추가
    const dateCell = document.createElement("td");
    if (!dateValue) {
        alert("날짜를 입력해주세요.");
        dateInput.focus();
        return;
    }
    dateCell.textContent = dateValue;

    const optionCell = document.createElement("td");
    if (selectedOption === "입/출금") {
        alert("입금 또는 출금을 선택해주세요.");
        selectOption.focus();
        return;
    }
    optionCell.textContent = selectedOption;

    const descriptionCell = document.createElement("td");
    if (!descriptionValue) {
        alert("내역을 입력해주세요.");
        descriptionInput.focus();
        return;
    }
    descriptionCell.textContent = descriptionValue;

    const moneyCell = document.createElement("td");
    if (!moneyValue) {
        alert("금액을 입력해주세요.");
        moneyInput.focus();
        return;
    }
    moneyCell.textContent = moneyValue;

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


    alert("데이터가 성공적으로 추가되었습니다.");

})

/* 추가 버튼 누를 시 필요한 입력 값들 GRAPH에 전달 */