from django.shortcuts import render
from django.core.serializers import serialize
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponse
from .models import Artist, Song
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.


def list(request):
    context = Song.objects.all()

    serialized_data = serialize('json', context)

    data = {'data': serialized_data}

    data = json.loads(serialized_data)

    fields_data = [record['fields'] for record in data]
    # print(fields_data)
    for record in fields_data:
        artist_id = record['artist']
        try:
            artist = Artist.objects.get(id=artist_id)
            artist_name = artist.artist_name
            record['artist'] = artist_name
        except Artist.DoesNotExist:
            record['artist'] = f"Artist with ID {artist_id} not found"    


    return JsonResponse(fields_data, safe=False)

@csrf_exempt
def create_card(request):
    res_data = {}
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data)

            artist_new = Artist.objects.create(artist_name=data.get('artist', ''))

            song_new = Song.objects.create(
                artist=artist_new,
                title=data.get('title', ''),
                artist_link=data.get('artist_link', '')
            )


            res_data['success'] = True
        
        except json.JSONDecodeError:
            res_data['success'] = False
            res_data['error'] = 'Invalid Input'

        except Exception as err:
            res_data['success'] = False
            res_data['error'] = str(err) 
        
        return JsonResponse(res_data)               

    else:
        error_msg = "Bad request: Something went wrong"
        return HttpResponseBadRequest(error_msg)
