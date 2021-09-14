FROM ubuntu
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install ssh -y
RUN apt-get install wget -y
RUN apt-get install npm -y
RUN apt-get install vim -y
RUN apt-get install htop -y
RUN apt-get install curl -y
