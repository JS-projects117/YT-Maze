
# [vidimaze.quest](https://vidimaze.quest/)

# *About*
This web app was made for anyone who wants to find new youtube media without recommendations influencing search results. A place where you can maybe find new things and even a ranking page so you can see what others have found.<br> <br>
The homepage art and palette were chosen with the idea that you would probably be browsing the site at night so... now you know.

# *Tech Stack*
- Frontend:
<code>React</code>
<code>Javascript</code>
<code>HTML/CSS</code>
- Backend:
<code>Java</code>
<code>Spring</code>
- Database:
<code>PostgreSQL</code>
- Hosting:
<code>Self hosted using a cloudflare tunnel</code>
- API:
<code>YouTube Data API v3</code>

# *How It Works*
Using the youtube api a set of words is generated from a word bank then entered into the api url request, the 1st result is returned then sent to the front end to be viewed. The site is hosted from my own pc which is running indefinitely using cloudflares free tunnel service to allow global access to the site.
