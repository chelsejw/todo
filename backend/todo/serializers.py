from rest_framework import serializers
from . import models


class ItemSerializer(serializers.ModelSerializer):
  class Meta:
      fields = ('id', 'title', 'completed', 'created_at', 'updated_at',)
      model = models.Item
      
