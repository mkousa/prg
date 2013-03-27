/*
 * Testing tool for monitoring file system events with Linux
 * inotify. For more information see "man inotify".
 *
 * Author: mika.kousa@gmail.com
 *
 * To compile: gcc -Wall -o inotify inotify.c
 * To run: ./inotify file1 directory1 ...
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/inotify.h>
#include <sys/ioctl.h>
#include <limits.h>

void printmask(unsigned int mask) {
#define prmask(x) if (mask & x) printf(#x " ")
  prmask(IN_ACCESS);
  prmask(IN_ATTRIB);
  prmask(IN_CLOSE_WRITE);
  prmask(IN_CLOSE_NOWRITE);
  prmask(IN_CREATE);
  prmask(IN_DELETE);
  prmask(IN_DELETE_SELF);
  prmask(IN_MODIFY);
  prmask(IN_MOVE_SELF);
  prmask(IN_MOVED_FROM);
  prmask(IN_MOVED_TO);
  prmask(IN_OPEN);
  prmask(IN_IGNORED);
  prmask(IN_ISDIR);
  prmask(IN_Q_OVERFLOW);
  prmask(IN_UNMOUNT);
}

int main(int argc,char **argv) {
  int in_fd, in_watch, i, readbytes;
  char buf[PATH_MAX];

  if (argc < 2) {
    printf("Usage: %s files/dirs ..\n", argv[0]);
    exit(1);
  }

  in_fd = inotify_init();
  if (in_fd < 0) {
    perror("inotify_init\n");
    exit(1);
  }

  for (i = 1; i < argc; i++) {
    in_watch = inotify_add_watch(in_fd, argv[i], IN_ALL_EVENTS);
    if (in_watch < 0) {
      perror("inotify_add_watch\n");
      exit(1);
    }
    printf("%s watch id %d\n", argv[i], in_watch);
  }

  while(1) {
    unsigned int offset = 0;
    struct inotify_event *ev;
    int avail = 0;

    while (ioctl(in_fd, FIONREAD, &avail) != 0)
      sleep(1);

    if (avail == 0) {
      sleep(1);
      continue;
    }

    if (avail < sizeof(struct inotify_event))
      continue;

    readbytes = read(in_fd, buf, sizeof(struct inotify_event)*5);
    if (readbytes < 0) {
      perror("read");
      break;
    } else if (readbytes < sizeof(struct inotify_event)) {
      continue;
    }

    while (offset < readbytes) {
      ev = (struct inotify_event *) (buf+offset);
      printf("wd=%d mask=%u ", ev->wd, ev->mask);
      printmask(ev->mask);
      printf("cookie=%u len=%u", ev->cookie, ev->len);
      if (ev->len && ev->len <= readbytes-offset-sizeof(struct inotify_event)) {
	printf(" name='%s'", ev->name);
	offset += ev->len;
      }
      offset += sizeof(struct inotify_event);
      printf("\n");
    }
  }

  //todo: inotify_rm_watch(in_fd, in_watch..);
  close(in_fd);
  return 0;
}
