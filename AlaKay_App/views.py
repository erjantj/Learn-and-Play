from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import Context, RequestContext
from django.contrib.auth.models import User
from django.shortcuts import render_to_response,get_object_or_404,redirect
from django.contrib.auth import logout
from AlaKay_App.forms import *
from AlaKay_App.models import *
from django.contrib.auth.decorators import login_required


from django.utils.translation import ugettext as _


import zipfile,os

site_media = os.path.join(
	os.path.dirname(__file__), '../site_media'
)


"""

Main page

render main page


"""

def main_page(request):
	games = Game.objects.order_by('-rate')
	
	games_row=[]
	games_all=[]
	for i in range(len(games)):
		curr_game = games[i]
		if curr_game.vote!=0:
			curr_game.rate = int((float(curr_game.rate)/float(curr_game.vote))*17)
			print curr_game.rate

		games_row.append(curr_game)
		if not (i+1)%3:
			games_all.append(games_row)
			games_row=[]
	
	games_all.append(games_row)

	variables = RequestContext(request,{
		'games_all':games_all,
		
	})
	return render_to_response('main_page.html',variables,RequestContext(request) )

def register_page(request):
	if request.method == 'POST':
		form = RegistrationForm(request.POST)
		if form.is_valid():
			user = User.objects.create_user(
				username=form.cleaned_data['username'],
				password=form.cleaned_data['password1'],
				email=form.cleaned_data['email']
			)
			return HttpResponseRedirect('/register/success')
	else:
		form=RegistrationForm()
	variables = RequestContext(request,{
		'form':form
	})
	return render_to_response(
		'registration/register.html',
		variables
	)

def logout_page(request):
	logout(request)
	return HttpResponseRedirect('/')
	
def user_page(request,username):
	username  = request.user.username
	user=get_object_or_404(User, username=username)

	mygames,created = MyGames.objects.get_or_create(user =  request.user)
	print mygames
	games = mygames.game.all()

	games_row=[]
	games_all=[]
	for i in range(len(games)):
		curr_game = games[i]
		if curr_game.vote!=0:
			curr_game.rate = int((float(curr_game.rate)/float(curr_game.vote))*17)
			print curr_game.rate
		games_row.append(curr_game)
		if not (i+1)%3:
			games_all.append(games_row)
			games_row=[]
	
	games_all.append(games_row)

	variables = RequestContext(request,{
		'username':username,
		'games': games_all,
	})
	return render_to_response('user_page.html',variables)

def upload(request):
    if request.method == 'POST':
        a=request.POST
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            _handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect('/')
    else:
        form = UploadFileForm()

    variables = RequestContext(request,{
		'form': form,
	})
    return render_to_response('test.html', variables)

def _handle_uploaded_file(file):
#    logging.debug("upload_here")
    if file:
        destination = open('/tmp/'+file.name, 'wb+')
        #destination = open('/tmp', 'wb+')
        for chunk in file.chunks():
            destination.write(chunk)
        destination.close()

def app_page(request,app_id):
	installed = False

	game  = get_object_or_404(Game,id=app_id)
	screenshots = game.screenshot.order_by('-id')
	
	path = game.fiel.path.split('/')
	path.reverse()
	game_name = path[0].split('.')[0]
	
	newpath = (site_media+'/games/'+path[1]+"/"+game_name)
	if not os.path.exists(newpath): 
		os.makedirs(newpath)
	
	myfile = zipfile.ZipFile(game.fiel.path)
	myfile.extractall(newpath)

	try:
		mygames = MyGames.objects.get(user = request.user,game=game)
		installed = True
	except Exception, e:
		installed = False

	variables = RequestContext(request,{
		'game':game,
		'installed':installed,
		'screenshots':screenshots,
		'link':"/site_media/games/"+path[1]+"/"+game_name+"/"+game_name+".html",
	})
	return render_to_response('app_page.html', variables)
def tag_page(request, tag_name): 
	tag = get_object_or_404(Tag, name=tag_name) 
	games = tag.game_set.order_by('-id') 

	games_row=[]
	games_all=[]
	for i in range(len(games)):
		curr_game = games[i]
		if curr_game.vote!=0:
			curr_game.rate = int((float(curr_game.rate)/float(curr_game.vote))*17)
			print curr_game.rate
		games_row.append(curr_game)
		if not (i+1)%3:
			games_all.append(games_row)
			games_row=[]
	
	games_all.append(games_row)


	variables = RequestContext(request, {
		'games': games_all, 
		'tag_name': tag_name, 

	}) 

	return render_to_response('tag_page.html', variables)

def about_page(request): 
	return render_to_response('about_page.html')

def raiting(request):
	if request.method == 'GET':
		user_votes=int(request.GET['user_votes'])
		game = get_object_or_404(Game, id=request.GET['id_arc'])
		
		game.rate = (game.rate + user_votes)
		game.vote = (game.vote+1)

		game.save()
		return HttpResponse("Your vote is accepted");


def add_to_list(request):
	if request.method == 'GET':
		if  request.GET.has_key('game_id'):
			game_id = request.GET['game_id']
			game = get_object_or_404(Game,id = game_id)
			mygames,created = MyGames.objects.get_or_create(user =  request.user)
			mygames.game.add(game)
	return redirect("/app/"+str(game_id))

def delete_from_list(request):
	if request.method == 'GET':
		if  request.GET.has_key('game_id'):
			game_id = request.GET['game_id']
			game = get_object_or_404(Game,id = game_id)
			mygames,created = MyGames.objects.get_or_create(user =  request.user)
			mygames.game.remove(game)
			
	return redirect("/app/"+str(game_id))
