from django.shortcuts import render


def index(request):
    context = {}
    context['request'] = request
    print "index request is", request
    return render(request, 'home/index.html', context)