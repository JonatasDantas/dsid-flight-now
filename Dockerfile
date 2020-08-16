FROM nginx:alpine

#!/bin/sh

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/dsid-flight-now/* /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]