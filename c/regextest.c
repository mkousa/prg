#define _GNU_SOURCE

#include <stdio.h> 
#include <stdlib.h> 
#include <sys/types.h>
#include <regex.h>

int main(int argc,char **argv)
{
    char *line = NULL;
    char errtxt[1024];
    ssize_t linelen = 0;
    size_t len = 0;
    int ret;

    regex_t preg;
    int cflags = REG_EXTENDED;

    if (argc < 2) {
        printf("Usage: %s regex\n", argv[0]);
        return 1;
    }

    ret = regcomp(&preg, argv[1], cflags);
    if (ret) {
        regerror(ret, &preg, errtxt, sizeof(errtxt)-1);
        printf("!regcomp %s: %s\n", argv[1], errtxt);
        return 1;
    }

    while ((linelen = getline(&line, &len, stdin)) != -1) {
        size_t nmatch = -1;
        regmatch_t pmatch;
        int eflags = 0;

        pmatch.rm_so = -1;
        pmatch.rm_eo = -1;

        line[linelen-1] = '\0';
        linelen--;
        printf("%s:", line);

        if (regexec(&preg, line, nmatch, &pmatch, eflags) == REG_NOMATCH)
            printf("nok\n");
        else
            printf("ok\n");
    }

    if (line)
        free(line);

    //regfree(&preg);

    return 0;
}
