#include <stdio.h>
#include <string.h>

#define MAX_ACCOUNTS 100
#define BASE_ACC_NO 1000000000  // 10-digit starting account number

typedef struct {
    char name[50];
    int acc_no;
    char password[20];
    float balance;
} Account;

Account accounts[MAX_ACCOUNTS];
int total_accounts = 0;
int logged_in_index = -1;  // -1 means no user is logged in

int findAccount(int acc_no) {
    for (int i = 0; i < total_accounts; i++) {
        if (accounts[i].acc_no == acc_no)
            return i;
    }
    return -1;
}

int verifyPassword(int index) {
    char input_pass[20];
    printf("Enter your password: ");
    scanf("%s", input_pass);
    if (strcmp(accounts[index].password, input_pass) == 0)
        return 1;
    return 0;
}

void createAccount() {
    if (total_accounts >= MAX_ACCOUNTS) {
        printf("Account limit reached.\n");
        return;
    }

    printf("Enter account holder name: ");
    scanf(" %[^\n]", accounts[total_accounts].name);

    printf("Set your account password: ");
    scanf("%s", accounts[total_accounts].password);

    accounts[total_accounts].balance = 0.0;
    accounts[total_accounts].acc_no = BASE_ACC_NO + total_accounts;

    printf("\nAccount created successfully!\n");
    printf("Your generated account number is: %d\n", accounts[total_accounts].acc_no);
    printf("Kindly remember this account number for further logins.\n");

    logged_in_index = total_accounts; // auto-login after account creation
    total_accounts++;
}

void login() {
    int acc_no, index;

    printf("Enter your account number: ");
    scanf("%d", &acc_no);

    index = findAccount(acc_no);
    if (index == -1) {
        printf("Account not found.\n");
        return;
    }

    if (!verifyPassword(index)) {
        printf("Incorrect password!\n");
        return;
    }

    logged_in_index = index;
    printf("Login successful! Welcome, %s.\n", accounts[index].name);
}

void logout() {
    if (logged_in_index == -1) {
        printf("No user is currently logged in.\n");
    } else {
        printf("User %s has been logged out.\n", accounts[logged_in_index].name);
        logged_in_index = -1;
    }
}

void depositMoney() {
    if (logged_in_index == -1) {
        printf("Please login first to perform this action.\n");
        return;
    }

    float amount;
    printf("Enter amount to deposit: ");
    scanf("%f", &amount);
    if (amount < 0) {
        printf("Invalid amount.\n");
        return;
    }

    accounts[logged_in_index].balance += amount;
    printf("Successfully deposited Rs.%.2f. New balance is Rs.%.2f\n", amount, accounts[logged_in_index].balance);
}

void withdrawMoney() {
    if (logged_in_index == -1) {
        printf("Please login first to perform this action.\n");
        return;
    }

    float amount;
    printf("Enter amount to withdraw: ");
    scanf("%f", &amount);
    if (amount <= 0) {
        printf("Invalid amount.\n");
        return;
    }

    if (amount > accounts[logged_in_index].balance) {
        printf("Insufficient balance.\n");
    } else {
        accounts[logged_in_index].balance -= amount;
        printf("Successfully withdrew Rs.%.2f. Remaining balance is Rs.%.2f\n", amount, accounts[logged_in_index].balance);
    }
}

void checkBalance() {
    if (logged_in_index == -1) {
        printf("Please login first to perform this action.\n");
        return;
    }

    printf("Your current balance is Rs.%.2f\n", accounts[logged_in_index].balance);
}

int main() {
    int choice;

    while (1) {
        printf("\n*** Bank Management System ***\n");
        printf("1. Create Account\n");
        printf("2. Login to Existing Account\n");
        printf("3. Deposit Money\n");
        printf("4. Withdraw Money\n");
        printf("5. Check Balance\n");
        printf("6. Logout\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1: createAccount(); break;
            case 2: login(); break;
            case 3: depositMoney(); break;
            case 4: withdrawMoney(); break;
            case 5: checkBalance(); break;
            case 6: logout(); break;
            case 7:
                printf("Thank you for using the system. Goodbye!\n");
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }

    return 0;
}