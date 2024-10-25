FROM python:3.10.7
ENV PYTHONONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
ADD requirements.txt /backend/
RUN pip install -r requirements.txt