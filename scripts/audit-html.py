from pathlib import Path
from html.parser import HTMLParser
import json
routes=['','services','gallery','meet-cassie','reviews','book','privacy']
class Page(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.links=[];self.main=0;self.labels=set();self.inputs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='main':self.main+=1
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='label':self.labels.add(a.get('for',''))
  if tag in ['input','select','textarea'] and a.get('type')!='hidden':self.inputs.append(a)
for route in routes:
 f=Path('.next/server/app')/((route or 'index')+'.html');s=f.read_text(encoding='utf-8');p=Page();p.feed(s)
 assert p.h1==1,(route,'h1',p.h1)
 assert p.main==1,(route,'main',p.main)
 for link in p.links:
  if link.startswith('/'):
   path=link.split('#')[0].split('?')[0].strip('/')
   assert path in routes,(route,'unknown internal route',link)
 if route=='book':
  for field in p.inputs:
   assert field.get('id') in p.labels,(route,'missing label',field.get('name'))
 assert 'Create Next App' not in s
 print(f'PASS /{route}: one h1, one main, known internal links, original metadata'+(', all form fields labeled' if route=='book' else ''))
css=''.join(p.read_text(encoding='utf-8') for p in Path('.next/static').rglob('*.css'))
assert '--color-primary:' in css
assert 'oklch(' in Path('app/globals.css').read_text(encoding='utf-8')
assert '@theme' not in css
print('PASS compiled CSS: source OKLCH theme compiled to browser color values; no unprocessed @theme rules')
print('NOTE: structural HTML audit only, not a browser or accessibility certification.')
