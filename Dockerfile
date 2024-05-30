FROM python:3.9


WORKDIR /app

ENV PYTHONDONTWRITTERBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]