FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY tests tests
COPY routers routers
COPY queries queries
COPY migrations migrations

RUN pip install -r requirements.txt
CMD uvicorn main:app --reload --host 0.0.0.0 --port $PORT