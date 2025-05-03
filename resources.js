// JavaScript for the resources page
document.addEventListener('DOMContentLoaded', function () {
    // Glossary accordion functionality
    const glossaryTerms = document.querySelectorAll('.glossary-term');

    glossaryTerms.forEach(term => {
        const heading = term.querySelector('h4');

        heading.addEventListener('click', () => {
            term.classList.toggle('active');
        });
    });

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            button.classList.add('active');

            // Filter cards
            resourceCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Compound interest calculator
    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function () {
            const principal = parseFloat(document.getElementById('principal').value);
            const contribution = parseFloat(document.getElementById('contribution').value);
            const rate = parseFloat(document.getElementById('rate').value);
            const years = parseInt(document.getElementById('years').value);

            const monthlyRate = rate / 100 / 12;
            let futureValue = principal;
            let totalContributions = principal;

            for (let i = 0; i < years * 12; i++) {
                futureValue = futureValue * (1 + monthlyRate) + contribution;
                totalContributions += contribution;
            }

            const interestEarned = futureValue - totalContributions;

            document.getElementById('future-value').textContent = '$' + futureValue.toFixed(2);
            document.getElementById('total-contributions').textContent = '$' + totalContributions.toFixed(2);
            document.getElementById('interest-earned').textContent = '$' + interestEarned.toFixed(2);
            document.getElementById('result').style.display = 'block';
        });
    }

    // Asset allocation tool
    const allocationBtn = document.getElementById('allocation-btn');

    if (allocationBtn) {
        allocationBtn.addEventListener('click', function () {
            const riskTolerance = document.getElementById('risk-tolerance').value;
            const investmentTimeline = document.getElementById('investment-timeline').value;

            let stockPercentage = 0;
            let bondPercentage = 0;
            let cashPercentage = 0;

            // Very simple allocation model for demonstration purposes
            if (riskTolerance === 'conservative') {
                stockPercentage = 30;
                bondPercentage = 50;
                cashPercentage = 20;
            } else if (riskTolerance === 'moderate') {
                stockPercentage = 60;
                bondPercentage = 30;
                cashPercentage = 10;
            } else if (riskTolerance === 'aggressive') {
                stockPercentage = 80;
                bondPercentage = 15;
                cashPercentage = 5;
            }

            // Adjust for timeline
            if (investmentTimeline === 'short') {
                stockPercentage -= 10;
                bondPercentage -= 5;
                cashPercentage += 15;
            } else if (investmentTimeline === 'long') {
                stockPercentage += 10;
                bondPercentage -= 5;
                cashPercentage -= 5;
            }

            // Ensure percentages are within bounds
            stockPercentage = Math.max(0, Math.min(100, stockPercentage));
            bondPercentage = Math.max(0, Math.min(100, bondPercentage));
            cashPercentage = Math.max(0, Math.min(100, cashPercentage));

            // Make sure they sum to 100%
            const total = stockPercentage + bondPercentage + cashPercentage;
            if (total !== 100) {
                const adjustment = (100 - total) / 3;
                stockPercentage += adjustment;
                bondPercentage += adjustment;
                cashPercentage += adjustment;
            }

            // Display results
            document.getElementById('allocation-chart').innerHTML = `
          <div style="display: flex; height: 30px; width: 100%;">
            <div style="background-color: #003366; width: ${stockPercentage}%;"></div>
            <div style="background-color: #d4af37; width: ${bondPercentage}%;"></div>
            <div style="background-color: #628e75; width: ${cashPercentage}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <div><span style="display: inline-block; width: 10px; height: 10px; background-color: #003366; margin-right: 5px;"></span> Stocks</div>
            <div><span style="display: inline-block; width: 10px; height: 10px; background-color: #d4af37; margin-right: 5px;"></span> Bonds</div>
            <div><span style="display: inline-block; width: 10px; height: 10px; background-color: #628e75; margin-right: 5px;"></span> Cash</div>
          </div>
        `;

            document.getElementById('allocation-text').innerHTML = `
          <p>Based on your ${riskTolerance} risk tolerance and ${investmentTimeline}-term investment timeline, we recommend the following allocation:</p>
          <ul>
            <li><strong>Stocks:</strong> ${Math.round(stockPercentage)}%</li>
            <li><strong>Bonds:</strong> ${Math.round(bondPercentage)}%</li>
            <li><strong>Cash & Equivalents:</strong> ${Math.round(cashPercentage)}%</li>
          </ul>
          <p><em>Note: This is a simplified model for educational purposes. Individual financial situations may require different allocations.</em></p>
        `;

            document.getElementById('allocation-result').style.display = 'block';
        });
    }
});