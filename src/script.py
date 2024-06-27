from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from time import sleep
import json

def get_cost(stat_html):
    return stat_html.find('span', {'class': 'Fw(b)-Th-L C(Cash) Tsh(Game) Fw(500)-Th-L'}).text

def get_damage(stat_html):
    for li in stat_html.find_all('li'):
        if (li.text.split(':')[0] == 'Damage'):
            return li.text.split(':')[1].strip().split(' ')[0]

def get_range(stat_html):
    for li in stat_html.find_all('li'):
        if (li.text.split(':')[0] == 'Range'):
            return li.text.split(':')[1].strip()

def get_spa(stat_html):
    for li in stat_html.find_all('li'):
        if (li.text.split(':')[0] == 'SPA'):
            return li.text.split(':')[1].strip()
        
def get_effect(stat_html):
    for li in stat_html.find_all('li'):
        if (li.text.split(':')[0] == 'Damage'):
            p = li.text.split(':')[1].strip()
            if (p.find('damage') != -1):
                effect = p.split(' ')
                return ' '.join(effect[3:len(effect)-1]).lower()
            else:
                return None
            
def get_money(stat_html):
    for li in stat_html.find_all('li'):
        if (li.text.split(':')[0] == 'Money'):
            return li.text.split(':')[1].strip().split(' ')[0]
    return None

def run():
    character_data = dict()

    character_list_url = "https://alsroblox.fandom.com/wiki/Category:Characters"
    response = requests.get(character_list_url)
    soup = BeautifulSoup(response.text, "html.parser")
    parsed_character_list_url = urlparse(character_list_url)
    for char in soup.find_all('a', {'class': 'category-page__member-link'}):
        sleep(1)
        char_url = f'{parsed_character_list_url.scheme}://{parsed_character_list_url.netloc}{char.get('href')}'
        char_response = requests.get(char_url)
        char_soup = BeautifulSoup(char_response.text, "html.parser")

        char_name = char_soup.find('h1', {'class': 'page-header__title'}).text.strip()
        character_data[char_name] = dict()
        print(char_name)

        for upgrade_num, stat_box in enumerate(char_soup.find_all('div', {'id': 'mw-customcollapsible-statsBoxMax', 'class': 'mw-collapsible mw-collapsed mw-collapsible_Stats-Box'})):
            character_data[char_name][upgrade_num] = {
                'cost': get_cost(stat_box),
                'damage': get_damage(stat_box),
                'range': get_range(stat_box),
                'spa': get_spa(stat_box),
                'effect': get_effect(stat_box),
                'money': get_money(stat_box)
            }
            print(character_data[char_name][upgrade_num])

        if not character_data[char_name]:
            del character_data[char_name]

    with open('data.json', 'w') as outfile:
        json.dump(character_data, outfile)

if __name__ == '__main__':
    run()