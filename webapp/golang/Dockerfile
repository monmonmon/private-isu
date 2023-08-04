FROM golang:1.20

RUN mkdir -p /home/webapp
WORKDIR /home/webapp
COPY . /home/webapp
RUN go build -o app

RUN apt-get update -qq && \
    apt-get install -y dstat && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

CMD ./app
