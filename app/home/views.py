from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from app.home.models import Projects, ProfileDetails


@login_required
def index(request):
    print "index page opened"
    # print request.user.first_name
    context = {}
    if request.user.is_authenticated():
        profile = ProfileDetails.objects.get(pk=request.user.id)
        context['request'] = request
        context['profile'] = profile
        return render(request, 'home/index.html', context)