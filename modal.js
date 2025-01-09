document.addEventListener("DOMContentLoaded", () => {
    const showBtn = document.querySelector(".container_table_modal");
    const dialogOne = document.getElementById("dialog-1");

    if (!showBtn || !dialogOne) {
        console.error("showBtn 또는 dialogOne 요소를 찾을 수 없습니다.");
        return;
    }

    const openModal = () => {
        const tableContents = document.querySelector(".container_table");
        console.log(tableContents);

        if (tableContents) {
            const modalTable = dialogOne.querySelector(".modal-table");

            // 모달에 테이블이 없는 경우 생성
            if (!modalTable) {
                const newModalTable = document.createElement("table");
                newModalTable.classList.add("modal-table");
                newModalTable.innerHTML = tableContents.innerHTML;
                dialogOne.appendChild(newModalTable); // 새로 만든 테이블 추가

                // 테이블을 새로 추가했으므로 정렬 기능을 다시 설정
                addSortButtons(newModalTable);
            } else {
                modalTable.innerHTML = tableContents.innerHTML; // 기존 테이블 내용만 복사
            }
        } else {
            console.error("기존 테이블을 찾을 수 없습니다.");
        }

        dialogOne.showModal(); // 모달 열기
    };

    // 모달 내 테이블에 정렬 버튼 추가하는 함수
    const addSortButtons = (modalTable) => {
        const sortDate = document.querySelector(".layout_date");
        const sortType = document.querySelector(".layout_type");

        // 정렬 버튼을 모달에 복사하여 추가
        const modalSortDate = modalTable.querySelector(".layout_date");
        const modalSortType = modalTable.querySelector(".layout_type");

        if (!modalSortDate) {
            const newSortDate = sortDate.cloneNode(true);
            modalTable.appendChild(newSortDate);
        }

        if (!modalSortType) {
            const newSortType = sortType.cloneNode(true);
            modalTable.appendChild(newSortType);
        }

        // 모달 내 정렬 버튼에 이벤트 리스너 추가
        addSortEventListeners(modalTable);
    };

    // 정렬 버튼의 이벤트 리스너 추가
    const addSortEventListeners = (modalTable) => {
        const dateAscBtn = modalTable.querySelector(".date-asc-btn");
        const dateDescBtn = modalTable.querySelector(".date-desc-btn");
        const typeAscBtn = modalTable.querySelector(".type-asc-btn");
        const typeDescBtn = modalTable.querySelector(".type-desc-btn");

        const tbody = modalTable.querySelector("tbody");

        // 날짜 정렬 버튼에 클릭 이벤트 추가
        dateAscBtn.addEventListener("click", () => {
            sortTable(tbody, 0, true, true); // 첫 번째 열(날짜) 오름차순 정렬
        });
        dateDescBtn.addEventListener("click", () => {
            sortTable(tbody, 0, false, true); // 첫 번째 열(날짜) 내림차순 정렬
        });

        // 입/출금 정렬 버튼에 클릭 이벤트 추가
        typeAscBtn.addEventListener("click", () => {
            sortTable(tbody, 1, true, false); // 두 번째 열(입/출금) 오름차순 정렬
        });
        typeDescBtn.addEventListener("click", () => {
            sortTable(tbody, 1, false, false); // 두 번째 열(입/출금) 내림차순 정렬
        });
    };

    // 공통 정렬 함수
    function sortTable(tbody, columnIndex, isAscending, isDateSort = false) {
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

    showBtn.addEventListener("click", openModal);

    dialogOne.addEventListener("click", function (event) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        if (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            dialogOne.close();
        }
    });
});
