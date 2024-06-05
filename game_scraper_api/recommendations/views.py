import requests
from bs4 import BeautifulSoup
from django.http import JsonResponse
from django.views import View
from .recommenderSystem import GameRecommended

class RecommendationView(View):
    def get(self, request):
        game_name = request.GET.get('game_name')
        if not game_name:
            return JsonResponse({'error': 'Game name is required'}, status=400)

        try:
            recommendations = GameRecommended(game_name.lower())
            response_data = recommendations.to_dict(orient='records')

            # Fetch images for each recommended game
            for game in response_data:
                image_url = self.fetch_game_image(game['Game'])
                game['Image'] = image_url

            return JsonResponse({'recommendations': response_data}, safe=False)
        except Exception as e:
            print(f"Error in recommender system: {e}")
            # If recommender system fails, fetch similar games from Google
            google_recommendations = self.fetch_similar_games_from_google(game_name)
            return JsonResponse({'recommendations': google_recommendations}, safe=False)

    def fetch_game_image(self, game_name):
        api_key = 'AIzaSyBKkIpXWz0y4-gu6LYyta8pXNXjpOnQecQ'
        engine_id = '3608f5ada5ef24a14'
        search_url = f'https://www.googleapis.com/customsearch/v1?key={api_key}&cx={engine_id}&q={game_name}&searchType=image&num=1'

        try:
            response = requests.get(search_url)
            if response.status_code == 200:
                data = response.json()
                if 'items' in data and data['items']:
                    image_url = data['items'][0]['link']
                    return image_url
        except requests.RequestException as e:
            print(f"Error fetching image for {game_name}: {e}")

        return None

    def fetch_similar_games_from_google(self, game_name):
        search_url = f'https://www.google.com/search?q={game_name} similar games'

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

        try:
            response = requests.get(search_url, headers=headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                google_recommendations = []

                # Find the "People also search for" section
                similar_games_section = soup.find_all('a', class_='ct5Ked klitem-tr PZPZlf')
                for game_tag in similar_games_section:
                    game_title = game_tag.get('title')
                    image_tag = game_tag.find('img')
                    image_url = self.fetch_game_image(game_title)
                    #image_url = image_tag['src'] if image_tag else None
                    google_recommendations.append({
                        'Game': game_title,
                        'Image': image_url
                    })
                return google_recommendations
        except requests.RequestException as e:
            print(f"Error fetching similar games from Google: {e}")

        return []