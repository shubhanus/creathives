from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required()
def index(request):
    # context = {}
    # context['request'] = request
    print "index"
    return render(request, 'home/index.html')