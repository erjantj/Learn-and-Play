import os.path
from django.conf.urls.defaults import *
from AlaKay_App.views import *
from django.views.generic.simple import direct_to_template

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

site_media = os.path.join(
	os.path.dirname(__file__), 'site_media'
)

urlpatterns = patterns('',
	#Users
	(r'i18n/',include('django.conf.urls.i18n')),
	(r'^$', main_page),
	(r'^user/(\w+)/$',user_page),
	(r'^upload/$',upload),
	(r'^app/(\d+)$',app_page),
	(r'^tag/([^\s]+)/$', tag_page),
	(r'^about/$', about_page),
	(r'^raiting/$', raiting),
	(r'^add_to_list/$', add_to_list),
	(r'^delete_from_list/$', delete_from_list),
	(r'^comments/', include('django.contrib.comments.urls')),
	
	#Session managemant
	(r'^site_media/(?P<path>.*)$', 'django.views.static.serve',
	{'document_root': site_media }),	
	(r'^login/$','django.contrib.auth.views.login'),
	(r'^logout/$',logout_page),
	(r'^register/$',register_page),
	(r'^register/success/$',direct_to_template,{'template':'registration/register_success.html'}),
	
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
