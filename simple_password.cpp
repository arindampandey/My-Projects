#include <iostream>
using namespace std;
class Pass
{
protected:
    string name;
    string pass;
    string a, y, x;

public:
    void ask_info()
    {
        cout << "Enter your name : ";
        cin >> name;
    }
    void set_password()
    {
        cout << "Set a password (In Words) : ";
        cin >> x;
        pass = x;
    }
    void ask_password()
    {
        cout << "Enter the password to view info : ";
        cin >> y;
    }
    void print_info()
    {
        cout << "--- Your Name Is " << name << " --- " << endl;
    }
    void check()
    {
        if (y == x)
        {
            cout << "Correct Password !!" << endl;
            print_info();
        }
        else
        {
            cout << "Wrong Password !! Try Again :( " << endl;
        }
    }
};

int main()
{
    Pass p1;
    p1.ask_info();
    p1.set_password();
    p1.ask_password();
    p1.check();
    return 0;
}