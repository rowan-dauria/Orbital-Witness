from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.views.decorators.http import require_GET
import aiohttp

from .utils import calculate_credits

# Create your views here.

def index(request: HttpRequest) -> HttpResponse:
    return HttpResponse("Hello, world. You're at the polls index.")

# Ensure that the usage endpoint is only accessible via GET requests
@require_GET
async def usage(request: HttpRequest) -> JsonResponse:

    async with aiohttp.ClientSession() as session:
        async with session.get('https://owpublic.blob.core.windows.net/tech-task/messages/current-period') as response:
            data = await response.json()
    
        result = await calculate_credits(session, data['messages'])
        # Close session to release connection resources
        await session.close()
    
    return JsonResponse({'usage': result})
