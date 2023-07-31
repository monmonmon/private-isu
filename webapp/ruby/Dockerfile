FROM ruby:3.2-buster

RUN mkdir -p /home/webapp
COPY Gemfile /home/webapp
COPY Gemfile.lock /home/webapp
WORKDIR /home/webapp
RUN bundle config set --local path 'vendor/bundle'
RUN bundle install
COPY . /home/webapp

RUN apt-get update -qq && \
    apt-get install -y dstat && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

CMD bundle exec foreman start
