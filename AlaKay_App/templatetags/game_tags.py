from django import template 
from AlaKay.AlaKay_App.models import * 

register = template.Library()

#Tags list
class ItemNode(template.Node):
    def __init__(self,request):
        self.request = request
        
    def render(self, context):
    	try:
    		tag_name, format_string = self.request.split_contents()
    		print format_string
    	except ValueError:
    		pass

        tgs = ''
        tags=Tag.objects.all()
        for i in tags:
            tgs = tgs + "<li><a href=/tag/"+i.name+">Age "+i.name+"</a></li>"
        return tgs


@register.tag(name="tags_menu")
def tags_menu(request, token):
    return ItemNode(request=token)