#include <stdio.h>
//#include <conio.h> 
#include <stdlib.h>

void logKey(char *ch);
    
void main() {
    FILE *fp;
    char c;

    fp = fopen("keystrokes.txt", "w");
    if (fp == NULL) {
        printf("Error opening file.\n");
        exit(1);
    }

    printf("Start typing (Press ESC to stop):\n");

    while (1) {
        c = getch();       // Get key without echo
        printf("%c", c);   // Optional: Show what you typed
        logKey(&c);

        if (c == 27) // ESC key to exit
            break;
    }

    fclose(fp);
}

void logKey(char *ch) {
    FILE *fp = fopen("keystrokes.txt", "a");  // append mode
    if (fp == NULL) {
        printf("Error writing to file.\n");
        return;
    }
    fputc(*ch, fp);
    fclose(fp);
}