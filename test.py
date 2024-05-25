import requests
from bs4 import BeautifulSoup

def scrape_response(url):
    response = requests.get(url)
    if response.status_code != 200:
        return None
    
    soup = BeautifulSoup(response.content, 'html.parser')
    name = soup.title.string if soup.title else "No title found"

    description_tag = soup.find('meta',attrs={'name': 'description'})
    print(description_tag)
    description = description_tag['content'] if description_tag else 'No content'

    return name, description

url = 'https://atmos.style/'
name, description = scrape_response(url)
print(f"Name: {name}\nDescription: {description}")