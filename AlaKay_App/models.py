from django.db import models
from django.contrib.auth.models import User
import datetime,os,time

UPLOAD_DIR_GAME_IMAGE = '/Users/workspace/AlaKay/site_media/images/games'
UPLOAD_DIR_SCREENSHOTS_IMAGE = '/Users/workspace/AlaKay/site_media/images/games/screenshots'
UPLOAD_DIR_GAME_FILE = '/Users/workspace/AlaKay/site_media/files'

class Game(models.Model):
	title = models.CharField(max_length=200) 
	description = models.TextField(max_length=500)
	rate = models.IntegerField()
	vote = models.IntegerField()

	image = models.ImageField(upload_to=UPLOAD_DIR_GAME_IMAGE)
	user = models.ForeignKey(User)
	link = models.ForeignKey('Link')
	screenshot = models.ManyToManyField('Screenshot')
	fiel  = models.FileField(upload_to=UPLOAD_DIR_GAME_FILE+"/"+str(int(time.time())))
	tag = models.ManyToManyField('Tag')

	def __unicode__(self):
		return self.title

	def image_name(self):
		return os.path.basename(self.image.path)

class MyGames(models.Model):
	user = models.ForeignKey(User)
	game = models.ManyToManyField('Game')

	def __unicode__(self):
		return self.user.username


class Screenshot(models.Model):
	image = models.ImageField(upload_to=UPLOAD_DIR_SCREENSHOTS_IMAGE)

	def __unicode__(self):
		return self.image.name
	
	def image_name(self):
		return os.path.basename(self.image.path)

class Tag(models.Model): 
	name = models.CharField(max_length=64, unique=True) 
	

	def __unicode__(self):
		return self.name

class Link(models.Model): 
	url = models.URLField(unique=True)

	def __unicode__(self):
		return self.url