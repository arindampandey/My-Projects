#include <stdio.h>
#include <stdlib.h>
#include <time.h>
//#include <string.h>

struct Account
{
    char name[50];  
    int acc_no[10];
    float balance;
    int isActive;
} users[100];

int totalUsers = 0;
int currentUserIndex = -1;

void generateAccNo(int acc_no[])
{
    for (int i = 0; i < 10; i++)
    {
        acc_no[i] = rand() % 10;
    }
}

void printAccNo(int acc_no[])
{
    for (int i = 0; i < 10; i++)
    {
        printf("%d", acc_no[i]);
    }
}

int isSameAccNo(int a[], int b[])
{
    for (int i = 0; i < 10; i++)
    {
        if (a[i] != b[i])
            return 0;
    }
    return 1;
}

void createAccount()
{
    if (totalUsers >= 100)
    {
        printf("User limit reached!\n");
        return;
    }
    printf("Enter your name: ");
    scanf("%s", users[totalUsers].name);
    generateAccNo(users[totalUsers].acc_no);
    users[totalUsers].balance = 0.0;
    users[totalUsers].isActive = 1;

    printf("Account created successfully!\nYour Account Number is: ");
    printAccNo(users[totalUsers].acc_no);
    printf("\n");

    totalUsers++;
}

int login()
{
    int acc_no[10];
    printf("Enter your 10-digit account number: ");
    for (int i = 0; i < 10; i++)
    {
        scanf("%1d", &acc_no[i]);
    }

    for (int i = 0; i < totalUsers; i++)
    {
        if (users[i].isActive && isSameAccNo(users[i].acc_no, acc_no))
        {
            currentUserIndex = i;
            return 1;
        }
    }
    return 0;
}

void credit()
{
    if (currentUserIndex == -1)
    {
        printf("Please login first.\n");
        return;
    }
    float amount;
    printf("Enter amount to credit: ");
    scanf("%f", &amount);
    if (amount > 0)
    {
        users[currentUserIndex].balance += amount;
        printf("Amount credited successfully.\n");
    }
    else
    {
        printf("Invalid amount.\n");
    }
}

void debit()
{
    if (currentUserIndex == -1)
    {
        printf("Please login first.\n");
        return;
    }
    float amount;
    printf("Enter amount to debit: ");
    scanf("%f", &amount);
    if (amount > 0 && amount <= users[currentUserIndex].balance)
    {
        users[currentUserIndex].balance -= amount;
        printf("Amount debited successfully.\n");
    }
    else
    {
        printf("Invalid or insufficient balance.\n");
    }
}

void viewAccount()
{
    if (currentUserIndex == -1)
    {
        printf("Please login first.\n");
        return;
    }
    printf("\n--- Account Details ---\n");
    printf("Name: %s\n", users[currentUserIndex].name);
    printf("Account Number: ");
    printAccNo(users[currentUserIndex].acc_no);
    printf("\nBalance: %.2f\n", users[currentUserIndex].balance);
}

void deleteAccount()
{
    if (currentUserIndex == -1)
    {
        printf("Please login first.\n");
        return;
    }
    users[currentUserIndex].isActive = 0;
    printf("Account deleted successfully.\n");
    currentUserIndex = -1;
}

void main()
{
    int ch;
    srand(time(0));
    while (1)
    {
        printf("\n--- Bank Menu ---\n");
        printf("1. Create Account\n");
        printf("2. Login\n");
        printf("3. Credit Money\n");
        printf("4. Debit Money\n");
        printf("5. View Account\n");
        printf("6. Delete Account\n");
        printf("7. Logout\n");
        printf("8. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &ch);

        switch (ch)
        {
        case 1:
            createAccount();
            break;
        case 2:
            if (login())
                printf("Login successful.\n");
            else
                printf("Account not found.\n");
            break;
        case 3:
            credit();
            break;
        case 4:
            debit();
            break;
        case 5:
            viewAccount();
            break;
        case 6:
            deleteAccount();
            break;
        case 7:
            currentUserIndex = -1;
            printf("Logged out successfully.\n");
            break;
        case 8:
            printf("Thank you!\n");
            exit(0);
        default:
            printf("Invalid choice.\n");
        }
    }
}