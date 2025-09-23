from openai import OpenAI
import requests

client = OpenAI()

def generate_description(website_url):
    try:
        response = requests.get(website_url, timeout=8)
        response.raise_for_status()
        text = response.text
    except Exception:
        html = "No description available"
    return 0