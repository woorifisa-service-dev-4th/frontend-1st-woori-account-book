// // DOMContentLoaded 이벤트가 발생하면 아래 코드를 실행
// document.addEventListener("DOMContentLoaded", () => {
//     // 거래 내역이 담긴 테이블 요소를 가져옴
//     const transactionsTable = document.querySelector(".container_table");
//     console.log(transactionsTable);

//     const transactions = []; // 거래 내역 데이터를 저장할 배열

//     // 테이블의 모든 행(<tr>)을 순회하며 데이터를 추출
//     Array.from(transactionsTable.querySelectorAll("tbody tr")).forEach(
//         (row) => {
//             const cells = row.querySelectorAll("td"); // 각 행의 모든 셀(<td>)을 가져옴
//             const date = cells[0].textContent.trim(); // 첫 번째 셀의 날짜 데이터
//             const type = cells[1].textContent.trim(); // 두 번째 셀의 거래 유형 (입금/출금)
//             const amount = parseInt(cells[3].textContent.trim(), 10); // 네 번째 셀의 금액을 정수로 변환
//             transactions.push({ date, type, amount }); // 거래 데이터를 배열에 추가
//             console.log(transactions);
//         }
//     );

//     // 월별 데이터를 저장할 배열을 초기화 (12개월, 초기값은 모두 0)
//     const monthlyData = Array.from({ length: 12 }, () => ({
//         income: 0, // 해당 월의 입금 총액
//         expense: 0, // 해당 월의 출금 총액
//     }));

//     // 추출한 거래 데이터를 순회하며 월별 합계를 계산
//     transactions.forEach(({ date, type, amount }) => {
//         const month = parseInt(date.split("-")[1], 10) - 1; // 날짜에서 월 정보 추출 (0부터 시작하는 인덱스)
//         if (type === "입금") {
//             monthlyData[month].income += amount; // 입금이면 해당 월의 입금 합계에 추가
//         } else if (type === "출금") {
//             monthlyData[month].expense += amount; // 출금이면 해당 월의 출금 합계에 추
//         }
//         console.log("입금" + monthlyData[month].income);
//         console.log("출금" + monthlyData[month].expense);
//     });

//     // 그래프 막대를 추가할 컨테이너 요소를 가져옴
//     const graphBars = document.getElementById("graph-bars");

//     // 월 이름 배열
//     const months = [
//         "1월",
//         "2월",
//         "3월",
//         "4월",
//         "5월",
//         "6월",
//         "7월",
//         "8월",
//         "9월",
//         "10월",
//         "11월",
//         "12월",
//     ];

//     // 월별 데이터를 순회하며 그래프 막대를 생성
//     monthlyData.forEach((data, index) => {
//         const barContainer = document.createElement("li"); // 막대 컨테이너 (<li>) 생성
//         const incomeBar = document.createElement("div"); // 입금 막대 (<div>) 생성
//         const expenseBar = document.createElement("div"); // 출금 막대 (<div>) 생성

//         // 막대의 클래스 설정
//         incomeBar.classList.add("income"); // 입금 막대에 'income' 클래스 추가
//         expenseBar.classList.add("expense"); // 출금 막대에 'expense' 클래스 추가

//         // 막대 높이를 계산 (최대 10em로 제한)
//         const incomeHeight = Math.min(data.income / 1000, 10);
//         const expenseHeight = Math.min(data.expense / 1000, 10);

//         // 입금 데이터가 있는 경우 막대의 높이와 색상 설정
//         if (data.income > 0) {
//             incomeBar.style.height = `${incomeHeight}em`; // 높이를 em 단위로 설정
//             incomeBar.style.backgroundColor = "#F07272"; // 입금은 빨간색
//         } else {
//             incomeBar.style.height = "0em"; // 입금 데이터가 없으면 높이를 0으로 설정
//         }

//         // 출금 데이터가 있는 경우 막대의 높이와 색상 설정
//         if (data.expense > 0) {
//             expenseBar.style.height = `${expenseHeight}em`; // 높이를 em 단위로 설정
//             expenseBar.style.backgroundColor = "#41AAFF"; // 출금은 파란색
//         } else {
//             expenseBar.style.height = "0em"; // 출금 데이터가 없으면 높이를 0으로 설정
//         }

//         // 입금 금액 텍스트 추가
//         if (data.income > 0) {
//             const incomeAmount = document.createElement("span");
//             incomeAmount.classList.add("bar-amount"); // 금액에 'bar-amount' 클래스 추가
//             incomeAmount.textContent = data.income.toLocaleString(); // 숫자를 천 단위로 포맷팅
//             incomeBar.appendChild(incomeAmount); // 금액 텍스트를 입금 막대에 추가
//         }

//         // 출금 금액 텍스트 추가
//         if (data.expense > 0) {
//             const expenseAmount = document.createElement("span");
//             expenseAmount.classList.add("bar-amount"); // 금액에 'bar-amount' 클래스 추가
//             expenseAmount.textContent = data.expense.toLocaleString(); // 숫자를 천 단위로 포맷팅
//             expenseBar.appendChild(expenseAmount); // 금액 텍스트를 출금 막대에 추가
//         }

//         // 월 이름 레이블 추가
//         const monthLabel = document.createElement("span");
//         monthLabel.classList.add("month-label"); // 월 레이블에 'month-label' 클래스 추가
//         monthLabel.textContent = months[index]; // 해당 월 이름 설정

//         // 막대 컨테이너에 생성한 요소들을 추가
//         barContainer.appendChild(incomeBar);
//         barContainer.appendChild(expenseBar);
//         barContainer.appendChild(monthLabel);

//         // 막대 컨테이너를 그래프 영역에 추가
//         graphBars.appendChild(barContainer);
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    // 초기 그래프 생성
    const transactionsTable = document.querySelector(".container_table");
    const graphBars = document.getElementById("graph-bars");

    // 그래프를 그리는 함수 정의
    function drawGraph() {
        const transactions = [];
        // 테이블의 모든 행(<tr>)에서 데이터를 추출
        Array.from(transactionsTable.querySelectorAll("tbody tr")).forEach(
            (row) => {
                const cells = row.querySelectorAll("td");
                const date = cells[0].textContent.trim();
                const type = cells[1].textContent.trim();
                const amount = parseInt(cells[3].textContent.trim(), 10);
                transactions.push({ date, type, amount });
            }
        );

        // 월별 데이터 초기화
        const monthlyData = Array.from({ length: 12 }, () => ({
            income: 0,
            expense: 0,
        }));

        // 데이터 누적
        transactions.forEach(({ date, type, amount }) => {
            const month = parseInt(date.split("-")[1], 10) - 1;
            if (type === "입금") {
                monthlyData[month].income += amount;
            } else if (type === "출금") {
                monthlyData[month].expense += amount;
            }
        });

        // 그래프 초기화 (기존 막대 제거)
        graphBars.innerHTML = "";

        // 그래프 재생성
        const months = [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ];
        monthlyData.forEach((data, index) => {
            const barContainer = document.createElement("li");
            const incomeBar = document.createElement("div");
            const expenseBar = document.createElement("div");

            incomeBar.classList.add("income");
            expenseBar.classList.add("expense");

            const incomeHeight = Math.min(data.income / 10000, 4.5);
            const expenseHeight = Math.min(data.expense / 10000, 4.5);

            // const totalHeight = Math.min(incomeHeight+expenseHeight / 10000, 10);

            if (data.income > 0) {
                incomeBar.style.height = `${incomeHeight}em`;
                incomeBar.style.backgroundColor = "#41AAFF";
                const incomeAmount = document.createElement("span");
                incomeAmount.classList.add("bar-amount");
                incomeAmount.textContent = data.income.toLocaleString();
                incomeBar.appendChild(incomeAmount);
            } else {
                incomeBar.style.height = "0em";
            }

            if (data.expense > 0) {
                expenseBar.style.height = `${expenseHeight}em`;
                expenseBar.style.backgroundColor = "#F07272";
                const expenseAmount = document.createElement("span");
                expenseAmount.classList.add("bar-amount");
                expenseAmount.textContent = data.expense.toLocaleString();
                expenseBar.appendChild(expenseAmount);
            } else {
                expenseBar.style.height = "0em";
            }

            const monthLabel = document.createElement("span");
            monthLabel.classList.add("month-label");
            monthLabel.textContent = months[index];

            barContainer.appendChild(incomeBar);
            barContainer.appendChild(expenseBar);
            barContainer.appendChild(monthLabel);
            graphBars.appendChild(barContainer);
        });
    }

    // 초기 그래프 그리기
    drawGraph();

    // MutationObserver 설정
    const observer = new MutationObserver(() => {
        console.log("테이블에 변경이 감지되었습니다. 그래프를 업데이트합니다.");
        drawGraph(); // 테이블 변경 시 그래프를 업데이트
    });

    // MutationObserver를 테이블에 적용
    observer.observe(transactionsTable.querySelector("tbody"), {
        childList: true, // 자식 노드 추가/제거 감지
        subtree: false, // 하위 요소의 변화는 감지하지 않음
    });
});
