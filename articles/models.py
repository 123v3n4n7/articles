from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    text = models.CharField(max_length=2000, null=False)
    owner = models.ForeignKey(User, related_name="articles", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text


# Create your models here.
