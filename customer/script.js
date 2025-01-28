document.addEventListener('DOMContentLoaded', function() {
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const addCustomerForm = document.getElementById('addCustomerForm');
    const submitCustomerBtn = document.getElementById('submitCustomerBtn');
    const customerList = document.getElementById('customerList');
    const customerDetailsScreen = document.getElementById('customerDetailsScreen');
    const customerDetailsName = document.getElementById('customerDetailsName');
    const customerEntries = document.getElementById('customerEntries');
    const moneyReceivedBtn = document.getElementById('moneyReceivedBtn');
    const moneyPendingBtn = document.getElementById('moneyPendingBtn');

    let customers = [];

    // Show add customer form
    addCustomerBtn.addEventListener('click', function() {
        addCustomerForm.style.display = 'block';
    });

    // Submit customer details
    submitCustomerBtn.addEventListener('click', function() {
        const name = document.getElementById('customerName').value;
        const mobile = document.getElementById('customerMobile').value;
        const note = document.getElementById('customerNote').value;

        if (name && mobile) {
            const customer = { name, mobile, note, entries: [] };
            customers.push(customer);
            renderCustomerList();
            addCustomerForm.style.display = 'none';
            clearForm();
        }
    });

    // Render customer list
    function renderCustomerList() {
        customerList.innerHTML = '';
        customers.forEach((customer, index) => {
            const customerDiv = document.createElement('div');
            customerDiv.className = 'customer-item';
            customerDiv.innerHTML = `
                <span>${customer.name}</span>
                <span>${customer.mobile}</span>
            `;
            customerDiv.addEventListener('click', () => showCustomerDetails(index));
            customerList.appendChild(customerDiv);
        });
    }

    // Show customer details
    function showCustomerDetails(index) {
        const customer = customers[index];
        customerDetailsName.textContent = customer.name;
        customerEntries.innerHTML = '';
        customer.entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'entry-item';
            entryDiv.innerHTML = `
                <span>${entry.date}</span>
                <span>${entry.type}: ${entry.amount}</span>
            `;
            customerEntries.appendChild(entryDiv);
        });
        customerDetailsScreen.style.display = 'block';
    }

    // Add money received entry
    moneyReceivedBtn.addEventListener('click', function() {
        addEntry('Received');
    });

    // Add money pending entry
    moneyPendingBtn.addEventListener('click', function() {
        addEntry('Pending');
    });

    // Add entry to customer
    function addEntry(type) {
        const amount = prompt(`Enter amount ${type.toLowerCase()}:`);
        if (amount) {
            const date = new Date().toLocaleString();
            const entry = { date, type, amount };
            const customerIndex = customers.findIndex(c => c.name === customerDetailsName.textContent);
            customers[customerIndex].entries.push(entry);
            showCustomerDetails(customerIndex);
        }
    }

    // Clear form fields
    function clearForm() {
        document.getElementById('customerName').value = '';
        document.getElementById('customerMobile').value = '';
        document.getElementById('customerNote').value = '';
    }

    // Close form when clicking outside
    document.addEventListener('click', function(event) {
        if (!addCustomerForm.contains(event.target) && event.target !== addCustomerBtn) {
            addCustomerForm.style.display = 'none';
        }
    });
});
