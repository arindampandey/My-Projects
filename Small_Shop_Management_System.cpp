#include <iostream>
using namespace std;
class Shop
{
protected:
    string name;
    int id;
    float price;

public:
    void setData(string a, int b, float c)
    {
        name = a;
        id = b;
        price = c;
    }
    void getData(void)
    {
        cout << "The name of item is " << name << endl;
        cout << "The ID of item is " << id << endl;
        cout << "The price of item is " << price << endl;
    }
};

int main()
{
    int size, i, q;
    string p;
    float r;
    cout << "Enter the number of items : ";
    cin >> size;
    Shop *ptr = new Shop[size];

    Shop *ptrTemp = ptr; // To re-initialize the value of ptr to use in the 2nd for loop.

    for (i = 0; i < size; i++)
    {
        cout << "Enter the name of item no. " << i + 1 << " : " << endl;
        cin >> p;
        cout << "Enter the ID of item no. " << i + 1 << " : " << endl;
        cin >> q;
        cout << "Enter the price of item no. " << i + 1 << " : " << endl;
        cin >> r;
        ptr->setData(p, q, r);
        ptr++;
    }

    for (i = 0; i < size; i++)
    {
        cout << "---Item Number " << i + 1 << " ---" << endl;
        ptrTemp->getData();
        ptrTemp++;
    }
    return 0;
}