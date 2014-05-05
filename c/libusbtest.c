#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <usb.h>

/* gcc -Wall $(libusb-config --cflags) -o libusbtest libusbtest.c $(libusb-config --libs) && ./libusbtest */

void print_bus_device(struct usb_device *device) {

  for ( ; device; device = device->next) {
    usb_dev_handle *uh;

    printf(" filename='%s'\n", device->filename);
    //struct usb_device_descriptor descriptor;
    //struct usb_config_descriptor *config;
    printf(" devnum=%u\n", device->devnum);
    printf(" num_children=%u\n", device->num_children);
    if (device->num_children > 0 && *device->children)
      print_bus_device(*device->children);

    uh = usb_open(device);
    if (uh) {
      char buf[1000];
      if (usb_get_string_simple(uh, 0, buf, sizeof(buf)) > 0)
	printf(" usb_get_string='%s'\n", buf);
    //int
      (void) usb_close(uh);
    }
  }

}

void print_bus(struct usb_bus *ub) {
    printf("dirname='%s'\n", ub->dirname);
    printf("devices:\n");
    print_bus_device(ub->devices);
    printf("location=%u\n", ub->location);
    //root_dev
}

int main(int argc, char *argv[]) {
  int ret;
  struct usb_bus *ub;

  usb_init();

  ret = usb_find_busses();
  printf("usb_find_busses=%d\n", ret);
  if (ret <= 0) {
    printf("nok\n");
    exit(1);
  }

  ret = usb_find_devices();
  printf("usb_find_devices=%d\n", ret);
  if (ret <= 0) {
    printf("nok\n");
    exit(1);
  }

  ub = usb_get_busses();
  if (!ub) {
    printf("usb_get_busses nok\n");
    exit(1);
  }

  for ( ;ub; ub = ub->next) {
    print_bus(ub);
    printf("\n");
  }

  return 0;
}
