from django.db import models

# Create your models here.
class Artist(models.Model):
    artist_name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.artist_name


class Song(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    artist_link = models.URLField()

    def __str__(self) -> str:
        return self.title + " " + "(" + str(self.artist) + ")"  