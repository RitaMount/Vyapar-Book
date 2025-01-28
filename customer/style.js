* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background-color: #f8f9fa;
}

.header {
    background-color: #780000;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.logo {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.main-content {
    margin-top: 70px;
    padding: 1rem;
    min-height: calc(100vh - 140px);
}

.add-customer-btn {
    background-color: #780000;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.add-customer-form {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1001;
}

.add-customer-form input, .add-customer-form textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add-customer-form button {
    background-color: #780000;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.customer-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.customer-item {
    background: white;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    cursor: pointer;
}

.customer-details-screen {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    padding: 1rem;
    z-index: 1002;
}

.customer-details-screen h2 {
    margin-bottom: 1rem;
}

.entry-item {
    background: #f8f9fa;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.action-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background: white;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
}

.green-btn {
    background-color: green;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.red-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border
