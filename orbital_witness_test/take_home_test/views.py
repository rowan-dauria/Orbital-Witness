from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
import aiohttp

from .calculate_usage import calculate_credits

# Create your views here.

def index(request: HttpRequest) -> HttpResponse:
    return HttpResponse("Hello, world. You're at the polls index.")

async def usage(request: HttpRequest) -> JsonResponse:
    
    async with aiohttp.ClientSession() as session:
        async with session.get('https://owpublic.blob.core.windows.net/tech-task/messages/current-period') as response:
            data = await response.json()
    
    result = await calculate_credits(data['messages'])
    
    return JsonResponse({'usage': result}, safe=False)
