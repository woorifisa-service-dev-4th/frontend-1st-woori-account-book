// 날짜와 입/출금 정렬 버튼 요소를 가져오기
const dateAscBtn = document.createElement("button");
const dateDescBtn = document.createElement("button");
const typeAscBtn = document.createElement("button");
const typeDescBtn = document.createElement("button");

// 버튼에 class 설정
dateAscBtn.classList.add("date-asc-btn");
dateDescBtn.classList.add("date-desc-btn");
typeAscBtn.classList.add("type-asc-btn");
typeDescBtn.classList.add("type-desc-btn");

// 버튼 텍스트 설정
dateAscBtn.textContent = " 🔼";
dateDescBtn.textContent = "🔽";
typeAscBtn.textContent = " 🔼";
typeDescBtn.textContent = "🔽";

// 각 버튼의 스타일 설정 (선택사항)
[dateAscBtn, dateDescBtn, typeAscBtn, typeDescBtn].forEach((btn) => {
    btn.style.margin = "2px";
    btn.style.cursor = "pointer";
});

// 버튼을 `.layout_date`와 `.layout_type` 요소 아래에 추가
const sortDate = document.querySelector(".layout_date");
const sortType = document.querySelector(".layout_type");

sortDate.appendChild(dateAscBtn);
sortDate.appendChild(dateDescBtn);
sortType.appendChild(typeAscBtn);
sortType.appendChild(typeDescBtn);

// 테이블의 tbody 요소를 가져오기
const tbody = document.querySelector("tbody");

// 공통 정렬 함수
function sortTable(columnIndex, isAscending, isDateSort = false) {
    // tbody 안의 모든 행을 가져오기
    const rows = Array.from(tbody.querySelectorAll("tr"));

    // 행 정렬
    const sortedRows = rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent;
        const cellB = rowB.cells[columnIndex].textContent;

        if (isDateSort) {
            // 날짜 정렬인 경우 Date 객체로 변환하여 비교
            const timeA = new Date(cellA);
            const timeB = new Date(cellB);
            return isAscending ? timeA - timeB : timeB - timeA;
        } else {
            // 문자 정렬 (입/출금)
            return isAscending
                ? cellA.localeCompare(cellB)
                : cellB.localeCompare(cellA);
        }
    });

    // 정렬된 행을 tbody에 다시 추가
    sortedRows.forEach((row) => tbody.appendChild(row));
}

// 날짜 정렬 버튼에 클릭 이벤트 추가
dateAscBtn.addEventListener("click", () => {
    sortTable(0, true, true); // 첫 번째 열(날짜) 오름차순 정렬
    console.log("날짜 오름차순 정렬 호출됨");
});
dateDescBtn.addEventListener("click", () => {
    sortTable(0, false, true); // 첫 번째 열(날짜) 내림차순 정렬
    console.log("날짜 내림차순 정렬 호출됨");
});

// 입/출금 정렬 버튼에 클릭 이벤트 추가
typeAscBtn.addEventListener("click", () => {
    sortTable(1, true, false); // 두 번째 열(입/출금) 오름차순 정렬
    console.log("입/출금 오름차순 정렬 호출됨");
});
typeDescBtn.addEventListener("click", () => {
    sortTable(1, false, false); // 두 번째 열(입/출금) 내림차순 정렬
    console.log("입/출금 내림차순 정렬 호출됨");
});
