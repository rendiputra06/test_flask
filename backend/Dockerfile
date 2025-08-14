# syntax=docker/dockerfile:1

# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=development

# Command to run the application
CMD ["flask", "run", "--host=0.0.0.0"]
