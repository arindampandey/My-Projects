#include <iostream>
using namespace std;

class Student {
protected:
    string name;
    int rollNo;

public:
    void inputStudentData() {
        cout << "Enter Name: ";
        cin >> name;
        cout << "Enter Roll Number: ";
        cin >> rollNo;
    }

    void displayStudentData() {
        cout << "Name: " << name << "\nRoll No: " << rollNo << endl;
    }
};

class Result : public Student {
    float marks1, marks2, marks3;

public:
    void inputMarks() {
        cout << "Enter marks of 3 subjects: ";
        cin >> marks1 >> marks2 >> marks3;
    }

    float calcPercentage() {
        return (marks1 + marks2 + marks3) / 3.0;
    }

    void displayResult() {
        displayStudentData();
        cout << "Percentage: " << calcPercentage() << "%" << endl;
    }
};

int main() {
    Result r;
    r.inputStudentData();
    r.inputMarks();
    r.displayResult();
    return 0;
}