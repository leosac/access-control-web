# Dockerfile that will create the leosac-web image

# Download base image ubuntu 16.04
FROM ubuntu:16.04

# Update Software repository
RUN apt-get update

# Install sudo
RUN apt-get install sudo 

# Install nginx
RUN apt-get install -y nginx

# Install curl to later install node
RUN apt-get install -y curl

# Install node
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN sudo apt-get update
RUN sudo apt-get install -y node

# Update the npm package
RUN npm install npm@latest -g

# Install bower
RUN npm install bower -g

# Install the latest vesion of ember-cli
RUN npm install -g ember-cli@latest

# Install git
RUN apt-get install -y git

# Ask the username and the email adress
ARG username=name
ARG email=myemail@mydomain.com

# Set the username and the email adress of the git profil
RUN git config --global user.name $username
RUN git config --global user.email $email

# Create a Leosac repository, and go in it
RUN mkdir -p /leosac

# Copy leosac-web and leosac-web-addons in it
# Leosac-web and leosac-web-addons should have been downloaded before 
ADD leosac/leosac-web /leosac/.
ADD leosac/leosac-web-addons /leosac/.

# Go to the leosac directory
RUN cd /leosac


