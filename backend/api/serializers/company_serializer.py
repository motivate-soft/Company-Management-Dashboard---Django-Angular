from rest_framework import serializers
from api.models import Company, CompanyStuff
from authentication.serializers import UserSerializer

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = ('id', 'name')


class CompanyStuffSerializer(serializers.ModelSerializer):
    stuff = UserSerializer(many=False)

    class Meta:
        model = CompanyStuff
        fields = ('company', 'stuff', 'role')
