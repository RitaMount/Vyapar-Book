document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emptyState = document.getElementById('emptyState');
    const customerList = document.getElementById('customerList');
    const customerListContent = document.getElementById('customerListContent');
    const addCustomerForm = document.getElementById('addCustomerForm');
    const customerForm = document.getElementById('customerForm');
    const addCustomerBtn = document.getElementById('addCustomerBtn');
    const addCustomerBtnList = document.getElementById('addCustomerBtnList');
    const cancelCustomerBtn = document.getElementById('cancelCustomerBtn');
    const customerDetails = document.getElementById('customerDetails');
    const customerDetailsName = document.getElementById('customerDetailsName');
    const customerDetailsMobile = document.getElementById('customerDetailsMobile');
    const customerDetailsNote = document.getElementById('customerDetailsNote');
    const entriesContent = document.getElementById('entriesContent');
    const totalReceived = document.getElementById('totalReceived');
    const totalPending = document.getElementById('totalPending');
    const moneyReceivedBtn = document.getElementById('moneyReceivedBtn');
    const moneyPendingBtn = document.getElementById('moneyPendingBtn');
    const transactionModal = document.getElementById('transactionModal');
    const transactionForm = document.getElementById('transactionForm');
    const transactionTitle = document.getElementById('transactionTitle');
    const cancelTransactionBtn = document.getElementById('cancelTransactionBtn');

    // State
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    let currentCustomerIndex = -1;
    let transactionType = '';

    // Initialize view
    function initializeView() {
        if (customers.length === 0) {
            emptyState.classList.remove('hidden');
            customerList.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            customerList.classList.remove('hidden');
            renderCustomerList();
        }
    }

    // Render customer list
    function renderCustomerList() {
        customerListContent.innerHTML = '';
        customers.forEach((customer, index) => {
            const customerElement = document.createElement('div');
            customerElement.className = 'customer-item';
            customerElement.innerHTML = `
                <div class="customer-name">${customer.name}</div>
                <div class="customer-mobile">${customer.mobile}</div>
            `;
            customerElement.addEventListener('click', () => showCustomerDetails(index));
            customerListContent.appendChild(customerElement);
        });
    }

    // Show customer details
    function showCustomerDetails(index) {
        currentCustomerIndex = index;
        const customer = customers[index];
        customerDetailsName.textContent = customer.name;
        customerDetailsMobile.textContent = customer.mobile;
        customerDetailsNote.textContent = customer.note || 'No note added';
        
        updateBalanceSummary();
        renderEntries();
        
        customerList.classList.add('hidden');
        customerDetails.classList.remove('hidden');
    }

    // Update balance summary
    function updateBalanceSummary() {
        const customer = customers[currentCustomerIndex];
        const received = customer.entries
            .filter(entry => entry.type === 'received')
            .reduce((sum, entry) => sum + entry.amount, 0);
        const pending = customer.entries
            .filter(entry => entry.type === 'pending')
            .reduce((sum, entry) => sum + entry.amount, 0);
        
        totalReceived.textContent = `₹${received}`;
        totalPending.textContent = `₹${pending}`;
    }

    // Render entries
    function renderEntries() {
        const customer = customers[currentCustomerIndex];
        entriesContent.innerHTML = '';
        
        if (customer.entries.length === 0) {
            entriesContent.innerHTML = '<p class="no-entries">No transactions yet</p>';
            return;
        }

        customer.entries
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.className = 'entry-item';
                entryElement.innerHTML = `
                    <div>
                        <div>${new Date(entry.date).toLocaleDateString()}</div>
                        <div class="entry-note">${entry.note || ''}</div>
                    </div>
                    <div class="entry-amount ${entry.type}">
                        ${entry.type === 'received' ? '+' : '-'}₹${entry.amount}
                    </div>
                `;
                entriesContent.appendChild(entryElement);
            });
    }

    // Event Listeners
    [addCustomerBtn, addCustomerBtnList].forEach(btn => {
        btn.addEventListener('click', () => {
            addCustomerForm.style.display = 'block';
            customerForm.reset();
        });
    });

    cancelCustomerBtn.addEventListener('click', () => {
        addCustomerForm.style.display = 'none';
    });

    customerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customer = {
            name: document.getElementById('customerName').value,
            mobile: document.getElementById('customerMobile').value,
            note: document.getElementById('customerNote').value,
            entries: []
        };
        customers.push(customer);
        localStorage.setItem('customers', JSON.stringify(customers));
        addCustomerForm.style.display = 'none';
        initializeView();
    });

    moneyReceivedBtn.addEventListener('click', () => {
        transactionType = 'received';
        transactionTitle.textContent = 'Add Money Received';
        transactionModal.style.display = 'block';
        transactionForm.reset();
    });

    moneyPendingBtn.addEventListener('click', () => {
        transactionType = 'pending';
        transactionTitle.textContent = 'Add Money Pending';
        transactionModal.style.display = 'block';
        transactionForm.reset();
    });

    cancelTransactionBtn.addEventListener('click', () => {
        transactionModal.style.display = 'none';
    });

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = Number(document.getElementById('transactionAmount').value);
        const note = document.getElementById('transactionNote').value;
        
        const entry = {
            type: transactionType,
            amount: amount,
            note: note,
            date: new Date().toISOString()
        };
        
        customers[currentCustomerIndex].entries.push(entry);
        localStorage.setItem('customers', JSON.stringify(customers));
        transactionModal.style.display = 'none';
        updateBalanceSummary();
        renderEntries();
    });

    // Handle back navigation from customer details
    document.querySelector('.back-button').addEventListener('click', (e) => {
        if (!customerDetails.classList.contains('hidden')) {
            e.preventDefault();
            customerDetails.classList.add('hidden');
            customerList.classList.remove('hidden');
            currentCustomerIndex = -1;
        }
    });

    // Initialize the view
    initializeView();
});
