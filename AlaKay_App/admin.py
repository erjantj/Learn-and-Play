from django.contrib import admin
from AlaKay.AlaKay_App.models import *




class GameAdmin(admin.ModelAdmin):
	#list_display = ('question','answer')
	ordering = ['-id']
	search_fields = ['title']

class ScreenshotAdmin(admin.ModelAdmin):
	ordering = ['-id']

class TagAdmin(admin.ModelAdmin):
	ordering = ['-id']
	search_fields = ['name']

class LinkAdmin(admin.ModelAdmin):
	ordering = ['-id']


admin.site.register(Game, GameAdmin)
admin.site.register(Screenshot, ScreenshotAdmin)
admin.site.register(Link, LinkAdmin)
admin.site.register(Tag, TagAdmin)