// Wait for the document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {

    // Glossary term toggle functionality
    const glossaryTerms = document.querySelectorAll('.glossary-term');

    glossaryTerms.forEach(term => {
        const heading = term.querySelector('h4');

        // Toggle the 'active' class on click to show/hide the glossary term
        heading.addEventListener('click', () => {
            term.classList.toggle('active');
        });
    });

    // Filter functionality for resource cards
    const filterButtons = document.querySelectorAll('.filter-button');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Add 'active' class to the clicked filter button
            button.classList.add('active');

            // Filter resource cards based on the selected category
            resourceCards.forEach(card => {
                const categories = card.getAttribute('data-category');

                // Show or hide cards based on the filter
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Investment calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function () {
            // Get values from input fields
            const principal = parseFloat(document.getElementById('principal').value);
            const contribution = parseFloat(document.getElementById('contribution').value);
            const rate = parseFloat(document.getElementById('rate').value);
            const years = parseInt(document.getElementById('years').value);

            const monthlyRate = rate / 100 / 12;
            let futureValue = principal;
            let totalContributions = principal;

            // Calculate future value of the investment over the given years
            for (let i = 0; i < years * 12; i++) {
                futureValue = futureValue * (1 + monthlyRate) + contribution;
                totalContributions += contribution;
            }

            // Calculate interest earned
            const interestEarned = futureValue - totalContributions;

            // Display results on the page
            document.getElementById('future-value').textContent = '$' + futureValue.toFixed(2);
            document.getElementById('total-contributions').textContent = '$' + totalContributions.toFixed(2);
            document.getElementById('interest-earned').textContent = '$' + interestEarned.toFixed(2);
            document.getElementById('result').style.display = 'block';
        });
    }

    // Asset allocation calculator functionality
    const allocationBtn = document.getElementById('allocation-btn');

    if (allocationBtn) {
        allocationBtn.addEventListener('click', function () {
            // Get risk tolerance and investment timeline from the user input
            const riskTolerance = document.getElementById('risk-tolerance').value;
            const investmentTimeline = document.getElementById('investment-timeline').value;

            let stockPercentage = 0;
            let bondPercentage = 0;
            let cashPercentage = 0;

            // Set asset allocation based on risk tolerance
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

            // Adjust allocation based on investment timeline
            if (investmentTimeline === 'short') {
                stockPercentage -= 10;
                bondPercentage -= 5;
                cashPercentage += 15;
            } else if (investmentTimeline === 'long') {
                stockPercentage += 10;
                bondPercentage -= 5;
                cashPercentage -= 5;
            }

            // Ensure percentages stay within 0-100 range
            stockPercentage = Math.max(0, Math.min(100, stockPercentage));
            bondPercentage = Math.max(0, Math.min(100, bondPercentage));
            cashPercentage = Math.max(0, Math.min(100, cashPercentage));

            // Adjust allocation so the total always equals 100%
            const total = stockPercentage + bondPercentage + cashPercentage;
            if (total !== 100) {
                const adjustment = (100 - total) / 3;
                stockPercentage += adjustment;
                bondPercentage += adjustment;
                cashPercentage += adjustment;
            }

            // Display allocation chart
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

            // Display text breakdown of the allocation
            document.getElementById('allocation-text').innerHTML = `
          <p>Based on your ${riskTolerance} risk tolerance and ${investmentTimeline}-term investment timeline, we recommend the following allocation:</p>
          <ul>
            <li><strong>Stocks:</strong> ${Math.round(stockPercentage)}%</li>
            <li><strong>Bonds:</strong> ${Math.round(bondPercentage)}%</li>
            <li><strong>Cash & Equivalents:</strong> ${Math.round(cashPercentage)}%</li>
          </ul>
          <p><em>Note: This is a simplified model for educational purposes. Individual financial situations may require different allocations.</em></p>
        `;

            // Display the allocation result section
            document.getElementById('allocation-result').style.display = 'block';
        });
    }
});
