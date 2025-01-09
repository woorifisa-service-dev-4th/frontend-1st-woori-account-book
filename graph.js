document.addEventListener("DOMContentLoaded", () => {
    const transactionsTable = document.querySelector(".container_table");
    const graphBars = document.getElementById("graph-bars");

    // 그래프를 그리는 함수
    function drawGraph() {
        const transactions = [];
        Array.from(transactionsTable.querySelectorAll("tbody tr")).forEach(
            (row) => {
                const cells = row.querySelectorAll("td");
                const date = cells[0].textContent.trim();
                const type = cells[1].textContent.trim();
                const amount = parseInt(cells[3].textContent.trim(), 10);
                transactions.push({ date, type, amount });
            }
        );

        const monthlyData = Array.from({ length: 12 }, () => ({
            income: 0,
            expense: 0,
        }));

        transactions.forEach(({ date, type, amount }) => {
            const month = parseInt(date.split("-")[1], 10) - 1;
            if (type === "입금") {
                monthlyData[month].income += amount;
            } else if (type === "출금") {
                monthlyData[month].expense += amount;
            }
        });

        graphBars.innerHTML = "";

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

            if (data.income > 0) {
                incomeBar.style.height = `${incomeHeight}em`;
                incomeBar.style.backgroundColor = "#41AAFF";

                // 금액 텍스트 요소 생성 (기본적으로 숨겨짐)
                const incomeAmount = document.createElement("span");
                incomeAmount.classList.add("bar-amount");
                incomeAmount.textContent = `입금: ${data.income.toLocaleString()}`;
                incomeBar.appendChild(incomeAmount);
            } else {
                incomeBar.style.height = "0em";
            }

            if (data.expense > 0) {
                expenseBar.style.height = `${expenseHeight}em`;
                expenseBar.style.backgroundColor = "#F07272";

                // 금액 텍스트 요소 생성 (기본적으로 숨겨짐)
                const expenseAmount = document.createElement("span");
                expenseAmount.classList.add("bar-amount");
                expenseAmount.textContent = `출금: ${data.expense.toLocaleString()}`;
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

    // Mouse hover event to show the amount above the bar
    const bars = document.querySelectorAll(".container_bar > li");
    bars.forEach((bar) => {
        const incomeBar = bar.querySelector(".income");
        const expenseBar = bar.querySelector(".expense");

        // Hover event for income bar
        if (incomeBar) {
            incomeBar.addEventListener("mouseenter", () => {
                const amount = incomeBar.querySelector(".bar-amount");
                if (amount) {
                    amount.style.display = "block"; // Show the amount when hovering
                }
            });
            incomeBar.addEventListener("mouseleave", () => {
                const amount = incomeBar.querySelector(".bar-amount");
                if (amount) {
                    amount.style.display = "none"; // Hide the amount when leaving
                }
            });
        }

        // Hover event for expense bar
        if (expenseBar) {
            expenseBar.addEventListener("mouseenter", () => {
                const amount = expenseBar.querySelector(".bar-amount");
                if (amount) {
                    amount.style.display = "block"; // Show the amount when hovering
                }
            });
            expenseBar.addEventListener("mouseleave", () => {
                const amount = expenseBar.querySelector(".bar-amount");
                if (amount) {
                    amount.style.display = "none"; // Hide the amount when leaving
                }
            });
        }
    });

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
